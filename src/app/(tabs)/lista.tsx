import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, FlatList, Pressable, View, Text, Linking, TouchableOpacity } from 'react-native';

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

//import { List, List1 } from '@/components/list1';


export default function TabTwoScreen() {

  const cadastrodb = useCadastroDb()

  const [search, setSearch] = useState("");
  const [cadastros, setCadastros] = useState<CadatroDB[]>()


  async function deletar(id) {

    const response = await cadastrodb.deletar(id);
    return true;
  }

  async function list() {

    try {
      const response = await cadastrodb.searchByName(search)
      setCadastros(response)
    } catch (error) {

    }

  }

  function details(tabName: string) {
    return (router.navigate(tabName))
  }


  function listagem1() {
    const renderItem = ({ item }) => (
      <View style={{ padding: 10 }}>
        <Text>{item.title}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('#')}>
          <Text style={styles.link}>{item.id} -
            <Text style={styles.link}>{item.nome}</Text>       |   <Text style={styles.link}>Alterar</Text>

          </Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <FlatList
        data={cadastros}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  };

  useEffect(() => {
    list()
  },
    [search])


  function totalReg() {
    return cadastros?.length;
  }

  function listagem() {
    const data = list();

    return (

      <View key="0" style={styles.container}>

        <View key="1">
          <Text  style={styles.titulo}>Lista de Registros</Text>
          <TouchableOpacity
            style={styles.button}
            >
            <Text style={styles.buttonText}>Sincronizar Dados</Text>
          </TouchableOpacity>
          
          <Text style={styles.total} >Total Registros {totalReg()}</Text>
        </View>
        {cadastros?.map((item, index) => (
          <View key={index} style={styles.list}>
            <View>
              <Text style={[styles.link, styles.nome]} key={item.id}>{item.id} - {item.nome} / {item.cpf}</Text>
            </View>
            <View style={{ flexDirection: "row" }} key={"_" + item.id}>

              {/* Alterar */}
              <View style={styles.imageView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push({ pathname: '/(tabs)/explore', params: { id: item.id } })
                  }}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/edit.png")
                    }
                  />

                </TouchableOpacity>
              </View>
              {/* Deletar */}
              <View style={styles.imageView}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    deletar(item.id)
                  }}
                >

                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/delete.png")}
                  />

                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

    );

  };

  return (

    listagem()

    // <View>
    //   <View style={styles.titulo}>
    //     <Text>Listagem</Text>
    //   </View>

    //   <View>
    //     {listagem()}
    //   </View>

    // </View>
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
  container: {
    padding: 5

  },
  list: {
    margin: 5,
    padding: 5,
    height: 44,
    backgroundColor: "silver",
    verticalAlign: "middle",
    flexDirection: "row",
    borderRadius: 5,
  }
  , titulo: {
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
    margin: 20,
  },
  total: {
    margin: 20,
  },
  op: {

  },
  link: {
    color: "blue",
    verticalAlign: "middle",

  },
  nome: {
    width: 280,
  },
  imageView: {
    //justifyContent: "center",
    //alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    height: 36,
    width: 36,
  },

  image: {
    height: 128,
    width: 128,
  },

  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
