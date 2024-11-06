import {
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
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
  // Adicione os outros itens do array `data` aqui
]

export default function Fotos() {
  const [products, setProducts] = useState(data)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const [isModalPictureVisible, setModalPictureVisible] = useState(false)

  const onCloseModalPicture = () => {
    setModalPictureVisible(false)
  }

  const changeImage = (index: number) => {
    console.log(index)
    setModalPictureVisible(false)
    handleSelectImage(products[index])
  }

  async function mapData(nomeFoto: string) {
    const fileStorage = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "/opseca/" + nomeFoto + ".jpg"
    )
    return fileStorage
  }

  function isImageExists(item: Product) {
    return item.source ? true : false
  }

  function setImage(item: Product) {
    if (isImageExists(item)) {
      setModalPictureVisible(true)
    } else {
      handleSelectImage(item)
    }
  }

  async function handleSelectImage(item: Product) {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })
      if (result.assets) {
        setProducts((prevProducts) => {
          const newProducts = [...prevProducts]
          const index = newProducts.indexOf(item)
          newProducts[index].source = result.assets[0].uri
          return newProducts
        })
        console.log("Imagem selecionada")
      }
    } catch (err) {
      console.log(err)
      Alert.alert("Erro", "Não foi possível selecionar a imagem")
    }
  }

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
                {isImageExists(item) ? (
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
            {selectedIndex === index && (
              <ModalPicture
                isVisible={isModalPictureVisible}
                onClose={onCloseModalPicture}
                changeImage={() => changeImage(index)}
              />
            )}
          </View>
        )}
      />
    </View>
  )
}
