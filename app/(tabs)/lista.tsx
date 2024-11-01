import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';

import { initializaDb } from '../db/db';
import { CadatroDB, useCadastroDb } from '../db/useCadastroDb';

import { Cadastro } from '@/components/Cadastros';
import { router, useNavigation, } from 'expo-router';




export default function TabTwoScreen() {


  const cadastrodb = useCadastroDb()

  const [search, setSearch] = useState("");
  const [cadastros, setCadastros] = useState<CadatroDB[]>()



  async function list() {

    try {
      const response = await cadastrodb.searchByName(search)
      setCadastros(response)
    } catch (error) {
      
    }
    
  }

   function details(tabName:string) {

    return (router.navigate(tabName))
    
  }

useEffect(()=>{
  list()
}, [search])


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      
      
      <FlatList
      data={cadastros}
      keyExtractor={(item)=>String(item.id)}
      renderItem={({item})=><Cadastro data={item} onPress={() =>details('explore/'+item.id)} />}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
