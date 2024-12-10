import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,  // Import Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useNotes } from '../Context/NotesProvider';

export default function NotesScreen() {
  const navigation = useNavigation();
  const { notes, deleteNotes } = useNotes();
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelectionMode, setSelectionMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSelection = (noteId) => {
    const updatedSelection = selectedNotes.includes(noteId)
      ? selectedNotes.filter((id) => id !== noteId)
      : [...selectedNotes, noteId];
    setSelectedNotes(updatedSelection);

    if (updatedSelection.length === 0) {
      setSelectionMode(false);
    }
  };

  const handleLongPress = (noteId) => {
    setSelectionMode(true);
    toggleSelection(noteId);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Notes',
      `Are you sure you want to delete ${selectedNotes.length} note${
        selectedNotes.length > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNotes(selectedNotes); // Pass all selected IDs at once
            setSelectionMode(false);
            setSelectedNotes([]);
          },
        },
      ]
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderNoteCard = ({ item }) => {
    const isSelected = selectedNotes.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => {
          Keyboard.dismiss(); // Dismiss the keyboard before navigating
          isSelectionMode ? toggleSelection(item.id) : navigation.navigate('Note', { note: item });
        }}
        onLongPress={() => handleLongPress(item.id)}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={1}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNoteCard}
        contentContainerStyle={styles.listContainer}
      />

      {isSelectionMode && selectedNotes.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>
            Delete {selectedNotes.length} Note{selectedNotes.length > 1 ? 's' : ''}
          </Text>
        </TouchableOpacity>
      )}

      {!isSelectionMode && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('Add Note')}
        >
          <Icon name="add" size={30} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: '30%' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  searchIcon: { marginRight: 5 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
  listContainer: { paddingHorizontal: 10 },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: '#cce5ff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardDescription: { fontSize: 14, color: '#666' },
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
