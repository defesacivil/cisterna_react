import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import { styles } from "@/styles/fotos"
import { useEffect, useRef, useState } from "react"
import { Camera, CameraView, CameraViewRef } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import { ModalPicture } from "@/components/ModalPicture"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useUpdateDb } from '../db/useCadastroDb';

export type Product = {
  id: number
  title: string
  price: string
  nome: string
  source?: string
}

const data: Product[] = [
  {
    id: 1,
    title: "Foto 1",
    price: "Frontal",
    nome: "frontal",
  },
  {
    id: 2,
    title: "Foto 2",
    price: "Lateral direita",
    nome: "lat_direito",
  },
  {
    id: 3,
    title: "Foto 3",
    price: "Lateral Esquerda",
    nome: "lat_esquerdo",
  },
  {
    id: 4,
    title: "Foto 4",
    price: "Fundo",
    nome: "fundo",
  },
  {
    id: 5,
    title: "Foto 5",
    price: "Local de instalação 1",
    nome: "local_ins_p1",
  },
  {
    id: 6,
    title: "Foto 6",
    price: "Local de instalação 2",
    nome: "local_ins_p2",
  },
  {
    id: 7,
    title: "Foto 7",
    price: "Opcional 1",
    nome: "op1",
  },
  {
    id: 8,
    title: "Foto 8",
    price: "Opcional 2",
    nome: "op2",
  },
  {
    id: 9,
    title: "Foto 9",
    price: "Opcional 3",
    nome: "op3",
  },
  {
    id: 10,
    title: "Foto 10",
    price: "Opcional 4",
    nome: "op4",
  },
  // Adicione os outros itens do array `data` aqui
]

export default function Fotos() {
  const [products, setProducts] = useState(data)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [modalVisible, setModalVisible] = useState(false)
  const [modalObs, setModalObs] = useState(false)
  const [obs, setObs] = useState(null)

  const cadastrodb = useUpdateDb();

  async function updateObs() {
    try {
      
      const response = await cadastrodb.updateObs({
        id,
        foto,
        field
      })

      Alert.alert("Cadastro Realiza Com Sucesso ! " + response.insertedRowId)

      //navigateToSettings(cpf)


    } catch (error) {
      console.log(error)
      Alert.alert("error" + error)

    }
  }

  // async function mapData(nomeFoto: string) {
  //   const fileStorage = await FileSystem.getInfoAsync(
  //     FileSystem.documentDirectory + "/opseca/" + nomeFoto + ".jpg"
  //   )
  //   return fileStorage
  // }

  async function isImageExists() {
    const fileStorage = await AsyncStorage.getItem("fotos")
    const data = fileStorage ? JSON.parse(fileStorage) : []
    data.map((item: Product) => {
      if (item.source) {
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts]
          const index = newProducts.filter(
            (product) => product.id === item.id
          )[0]
          index.source = item.source
          newProducts[index.id - 1] = index
          return newProducts
        })
      }
    })
  }

  const setImage = (item: Product) => {
    if (item.source) {
      setModalVisible(true)
    } else {
      handleSelectImage(item)
    }
  }

  async function handleSelectImage(item: Product) {
    const { granted } = await ImagePicker.getCameraPermissionsAsync()
    if (!granted) {
      await ImagePicker.requestCameraPermissionsAsync()
    } else {
      const result = await ImagePicker.launchCameraAsync()
      if (result.assets) {
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts]
          const index = newProducts.indexOf(item)
          newProducts[index].source = result.assets[0].uri
          return newProducts
        })
        await AsyncStorage.setItem("fotos", JSON.stringify(products))
      }
    }
  }

  async function deletePhoto() {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts]
      newProducts[selectedIndex].source = undefined
      return newProducts
    })
    await AsyncStorage.setItem("fotos", JSON.stringify(products))
    setModalVisible(false)
  }

  async function salvarObs() {
    updateObs();
    setModalObs(false)
  }

  async function openModalObs() {
    setModalObs(true)
  }

  function handleCloseModal() {
    setModalVisible(false)
  }

  useEffect(() => {
    isImageExists()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={products}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 24 }}
        renderItem={({ item, index }) => (
          <View style={styles.card} key={item.id}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
            <View style={styles.imageView}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedIndex(index)
                  setImage(item)
                }}
              >
                {item.source ? (
                  <Image style={styles.image} source={{ uri: item.source }} />
                ) : (
                  <Image
                    style={styles.icon}
                    source={{
                      uri: "https://img.icons8.com/nolan/96/3498db/add-shopping-cart.png",
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.obs}>
              <TouchableOpacity
                style={styles.button1}
                onPress={openModalObs}>
                <Text style={styles.buttonText}>Obs</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Foto */}
      <Modal
        visible={modalVisible}
        transparent
        statusBarTranslucent
        style={{ flex: 1 }}
      >
        <View style={styles.containerModal}>
          <View style={styles.modalButton}>
            <Text>Deseja deletar a foto?</Text>
            <View style={styles.wrapperButtons}>
              <Pressable style={styles.button} onPress={deletePhoto}>
                <Text>Sim</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={handleCloseModal}>
                <Text>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Obs: */}
      <Modal
        visible={modalObs}
        transparent
        statusBarTranslucent
        style={{ flex: 1 }}
      >
        <View style={styles.containerModal}>
          <View style={styles.modalButton}>
            <View style={styles.obs}>
              <Text style={{fontWeight: "bold"}} >Obs :</Text>
              <TextInput multiline={true}
                numberOfLines={10}
                style={{
                  height: "90%",
                  textAlignVertical: 'top',
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                }}
                clearButtonMode="always" onChangeText={setObs} maxLength={255} />
            </View>
            <View style={styles.wrapperButtons}>
              <Pressable style={styles.button} onPress={salvarObs}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
