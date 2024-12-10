import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
import NotesScreen from '../screens/NotesScreen'
import ToDoScreen from '../screens/ToDoScreen'

const BottomTab = () => {
  return (
    <>
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: '#888',
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarIconStyle: styles.tabBarIconStyle,
          }}
        >
          <Tab.Screen
            name="NotesScreen"
            component={ NotesScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="document-text-outline" color={color} size={size} />
              ),
              tabBarLabel: 'Notes',
            }}
          />
          <Tab.Screen
            name="ToDoScreen"
            component={ToDoScreen}
            options={{
              
              tabBarIcon: ({ color, size }) => (
                <Icon name="checkmark-done-outline" color={color} size={size} />
              ),
              tabBarLabel: 'To-Do',
              headerShown: true
            }}
          />
        </Tab.Navigator>
    </>
  )
}

export default BottomTab;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 70,
    marginHorizontal: 15,
    marginBottom:"3%",
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabBarIconStyle: {
    marginTop: 5,
  },
  fabContainer: {
    position: 'absolute',
    
    right: 30,
    
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    
  },
});