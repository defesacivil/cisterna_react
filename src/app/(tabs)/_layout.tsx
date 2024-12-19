import { Tabs, router } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { SQLiteProvider } from 'expo-sqlite';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { initializaDb } from '../db/db';
import LoadingScreen from '@/components/LoadingScreen';
import { Alert, View } from 'react-native';


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
            href: null,
            // href: {
            //   pathname: '/explore',
            //   params: {
            //     user: '',
            //   },
            // },
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />

          <Tabs.Screen
            name="fotos"
            options={{
             href: null,
              title: 'Fotos',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
              ),
            }}
          />
          
        <Tabs.Screen
          name="cam"
          options={{
            href: null,
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
        <Tabs.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </SQLiteProvider>
  );
}
