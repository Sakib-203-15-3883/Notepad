import React from 'react';
import { View, Text, StyleSheet, Alert, Share, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNotes } from '../Context/NotesProvider';

export default function NoteDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { note } = route.params;
  const { deleteNotes } = useNotes(); // Updated to match the context method

  // Function to handle note deletion
  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteNotes([note.id]); // Pass note ID as an array
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Function to handle sharing the note
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Note Title: ${note.title}\n\nNote Details: ${note.description}`,
      });
    } catch (error) {
      console.error('Error sharing note:', error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerActions}>
          <Icon
            name="share-social-outline"
            size={24}
            color="#007bff"
            style={styles.headerIcon}
            onPress={handleShare}
          />
          <Icon
            name="trash-outline"
            size={24}
            color="#ff4d4d"
            style={styles.headerIcon}
            onPress={handleDelete}
          />
        </View>
      ),
    });
  }, [navigation, note]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'justify',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  headerIcon: {
    marginHorizontal: 10,
  },
});
