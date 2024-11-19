import { FontAwesome } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect, SetStateAction } from 'react';
import { Alert, Button, FlatList, PermissionsAndroid, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'expo-image';
import { router, useGlobalSearchParams } from 'expo-router';
import { exists } from 'react-native-fs';
import { useFocusEffect } from '@react-navigation/native';


const requestPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access library was denied');
  }
};




requestPermission();

let data = [
  {
    id: 1,
    title: 'Foto 1',
    price: 'Frontal',
    nome: 'frontal',
    source: '/data/user/0/host.exp.exponent/files/opseca/frontal.jpg',

  },
  {
    id: 2,
    title: 'Foto 2',
    price: 'Lateral direita',
    nome: 'lat_direito',
    source: '/data/user/0/host.exp.exponent/files/opseca/lat_direito.jpg',
  },
  {
    id: 3,
    title: 'Foto 3',
    price: 'Lateral Esquerda',
    nome: 'lat_esquerdo',
    source: '/data/user/0/host.exp.exponent/files/opseca/lat_esquerdo.jpg',
  },
  {
    id: 4,
    title: 'Foto 4',
    price: 'Fundos',
    nome: 'fundo',
    image: '/data/user/0/host.exp.exponent/files/opseca/fundo.jpg',
  },
  {
    id: 5,
    title: 'Foto 5',
    price: 'Local instalação reservatório Perspectiva 1',
    nome: 'local_ins_p1',
    image: '/data/user/0/host.exp.exponent/files/opseca/local_ins_p1.jpg',
  },
  {
    id: 6,
    title: 'Foto 6',
    price: 'Local instalação reservatório Perspectiva 2',
    nome: 'local_ins_p2',
    image: '/data/user/0/host.exp.exponent/files/opseca/local_ins_p2.jpg',
  },
  {
    id: 7,
    title: 'Foto 7',
    price: 'Opcional',
    nome: 'op1',
    image: '/data/user/0/host.exp.exponent/files/opseca/op1.jpg',
  },
  {
    id: 8,
    title: 'Foto 8',
    price: 'Opcional',
    nome: 'op2',
    image: '/data/user/0/host.exp.exponent/files/opseca/op2.jpg',
  },
  {
    id: 9,
    title: 'Foto 9',
    price: 'Opcional',
    nome: 'op3',
    image: '/data/user/0/host.exp.exponent/files/opseca/op3.jpg',
  },
  {
    id: 10,
    title: 'Foto 10',
    price: 'Opcional',
    nome: 'op4',
    image: '/data/user/0/host.exp.exponent/files/opseca/op4.jpg',
  },
]



async function mapData(nomeFot: String) {

  try {
    const info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + '/opseca/' + nomeFot + '.jpg');

    if (info.exists) {
      return info.uri;
    } else {
      return "-";
    }

  } catch (error) {
    console.log('erro acesso a imagem no dispositovo');
  }

};


export default function () {

  //const cpf = useGlobalSearchParams();

  //console.log(cpf)
  const cpf = "03260414606";

  const [products, setProducts] = useState(data)
  const [nomeFoto, setNomeFoto] = useState()
  const [imgUri, setImgUri] = useState(data)


  useFocusEffect(() => {
    dataNew(data);
    setProducts(data);
  });


  function dataNew(data) {

    data.map((item) => {
      return item.source = mapData(item.name);
    });

  };


  async function criaDir() {
    try {
      const operacao = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'opseca');
      if (!operacao) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "opseca");
      }

      const cliente = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'opseca/' + cpf.cpf);
      if (!cliente) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "opseca/" + cpf.cpf);
      }
    } catch (error) {
      console.log(error + ' readdir')
    }

  }



  function addImagem(cpf: any, nome: any) {
    setNomeFoto(nome)
    router.push({ pathname: '/(tabs)/cam', params: { cpf, nome } }
    );

  }

  const visualizaImagem = (nome: any) => {
    setNomeFoto(nome)
    router.push({ pathname: '/(tabs)/cam', params: { nomeFoto: nome } }
    );

  }

  function removeImagem() {
    Alert.alert('Success', 'The product has been added to your cart')
  };



  return (

    <View style={styles2.container}>

      <ScrollView>
        {data.map((post) => {
          return  <View><View style={styles3.imagem}>
                      <Text>{post.nome}</Text>
                  </View>
                  <View style={styles3.imagem}>
                    <Image source={{ uri: 'file:' + post.image }} style={{ width: 150, height: 150 }} />
                  </View>
                  </View>
        })}


      </ScrollView>
    </View>

  );
}

const styles3 = StyleSheet.create({
  container: {
    margin: 20,
    flexDirection: 'column',


  },
  moldura: {

    height: 150,

  },
  imagem: {
    borderWidth: 1,
    width: 150,
    height: 150,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-around',
  }

});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  galery: {
    flex: 1,
    flexDirection: "row",
    height: 100,

  },
  imagem:
  {
    margin: 10,
    width: 100,
    height: 100,
    borderWidth: 1,
    flexDirection: "row"
  }
});


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  buyNow: {
    color: 'purple',
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
