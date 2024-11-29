import { Tabs, router } from 'expo-router';
import React, { useState } from 'react';

import { SQLiteProvider } from 'expo-sqlite';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { initializaDb } from '../db/db';
import { Alert } from 'react-native';

import FileSystem from 'expo-file-system';


export default function TabLayout() {

  const colorScheme = useColorScheme();

  return (


    <SQLiteProvider databaseName='seca.db' onInit={initializaDb}>
      
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        
      }}
      >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          href: {
            pathname: '/',
            params: {
              user: '',
            },
          },
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
        />

      {/* Explore   */}
      <Tabs.Screen
        name="explore"
        
        options={{
          title: 'Cadastro',
          href: {
            pathname: '/explore',
            params: {
              user: '',
            },
          },
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
