import { Tabs } from 'expo-router';
import React from 'react';

import { SQLiteProvider } from 'expo-sqlite';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { initializaDb } from '../db/db';



export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName='seca.db' onInit={initializaDb}>
      
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>

      <Tabs.Screen
        name="index"
        
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Cadastro',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="fotos"
        options={{
          href :null,
          title: 'Fotos',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="cam"
        options={{
        href :null,
          title: 'Camera',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
        />
      <Tabs.Screen
        name="lista"
        options={{
          title: 'Listagem',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
        />
    </Tabs>
        </SQLiteProvider>
  );
}
