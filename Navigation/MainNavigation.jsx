import React from 'react';
import BottomTab from './BottomTab';
import AddNoteScreen from '../screens/AddNoteScreen';
import NoteDetailsScreen from '../screens/NoteDetailsScreen';
import {NotesProvider} from '../Context/NotesProvider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import search from '../screens/search';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <>
      <NotesProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen
              name="Add Note"
              component={AddNoteScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="Note"
              component={NoteDetailsScreen}
              options={{headerShown: true}}
            />
            <Stack.Screen
              name="search"
              component={search}
              options={{headerShown: true}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NotesProvider>
    </>
  );
};

export default MainNavigation;
