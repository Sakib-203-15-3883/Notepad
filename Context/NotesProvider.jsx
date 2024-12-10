import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };
    loadNotes();
  }, []);

  const saveNotesToStorage = async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const addNote = (note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  const deleteNotes = (ids) => {
    const updatedNotes = notes.filter((note) => !ids.includes(note.id));
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
