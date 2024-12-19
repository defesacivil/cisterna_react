import { Alert, Button, FlatList, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View, RefreshControl } from "react-native"
import * as FileSystem from "expo-file-system"
import { styles } from "@/styles/fotos"
import React, { useEffect, useRef, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCadastroDb } from '../db/useCadastroDb';
import { useGlobalSearchParams, useRouter } from "expo-router"

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
    source: "",
  },
  {
    id: 2,
    title: "Foto 2",
    price: "Lateral direita",
    nome: "lat_direito",
    source: "",
  },
  {
    id: 3,
    title: "Foto 3",
    price: "Lateral Esquerda",
    nome: "lat_esquerdo",
    source: "",
  },
  {
    id: 4,
    title: "Foto 4",
    price: "Fundo",
    nome: "fundo",
    source: "",
  },
  {
    id: 5,
    title: "Foto 5",
    price: "Local de instalação 1",
    nome: "local_ins_p1",
    source: "",
  },
  {
    id: 6,
    title: "Foto 6",
    price: "Local de instalação 2",
    nome: "local_ins_p2",
    source: "",
  },
  {
    id: 7,
    title: "Foto 7",
    price: "Opcional 1",
    nome: "op1",
    source: "",
  },
  {
    id: 8,
    title: "Foto 8",
    price: "Opcional 2",
    nome: "op2",
    source: "",
  },
  {
    id: 9,
    title: "Foto 9",
    price: "Opcional 3",
    nome: "op3",
    source: "",
  },
  {
    id: 10,
    title: "Foto 10",
    price: "Opcional 4",
    nome: "op4",
    source: "",
  },
]


export default function Fotos() {

  const params = useGlobalSearchParams();

  console.log(params.cpf)

  var param_id = (params.id) ? params.id.toString() : "";
  var param_cpf = (params.cpf) ? params.cpf.toString() : "";


  //console.log("param-" + params.id)
  const router = useRouter();
  const useUpdateObs = useCadastroDb();

  const [products, setProducts] = useState(data)
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalObs, setModalObs] = useState(false)

  const [obs, setObs] = useState("")
  const [id, setId] = useState(param_id)
  const [foto, setFoto] = useState("")
  const [cpf, setCpf] = useState(param_cpf)


  useEffect(() => {
    //setCpf(params.cpf)
    checaDirCpf();


    /* Verifica imagem do disco e visualiza */
  const isImageExists = async() => {
    
    //console.log(param_cpf + " - ")
    const dirCPFexist = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "opseca/" + param_cpf)
    await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "opseca/" + param_cpf)
      .then(function (response) {
        const data1 = response;
        data.map((dado12) => {
          dado12.source = ""
          //console.log(dado12.source + " source Data")
        });

        const newData = [...data];
        newData.forEach((file, index) => {
          //console.log(file.source + " uri ja gravada");
          data1.forEach((dado) => { //diretorio cpf
            if (dado.indexOf(file.nome.toString()) != -1) {
              //console.log(file.nome.toString()+" file.nome\n")
              newData[index].source = "file:///data/data/host.exp.exponent/files/opseca/" + param_cpf + "/" + dado
            }else {
              //newData[index].source = "";
            }
          })
        });

        setProducts(newData)
        //console.log(newData);
      })
  };

    isImageExists();

  }, [param_id])

  /* Atualizar obse da foto */
  async function updateObs() {
    try {
      const result = await useUpdateObs.updateObs({
        id,
        foto,
        obs
      }).then(response => {
      })
    } catch (error) {
      console.log(error + " funcao updateObs")
    }
  }

  /** buscar observação imagem pelo nome */
  async function searchObsImg(foto1: string) {
    try {
      //console.log(id+foto)
      const result = await useUpdateObs.searchObsImg(id).then(response => {
        setObs(response[foto1]);
      })
    } catch (error) {
      console.log(error + " error searchObsImg() ")
    }
  }

  /* checa dir cpf */
  async function checaDirCpf() {
    try {
      const dir = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "opseca/" + cpf)
        .then(function (response) {
          //console.log(response.isDirectory + "Não Remover checagem dir Cpf");
          if (!response.exists) {
            criaDirCpf(cpf);
          }
        })
    } catch (error) {
      console.log(error + " checaDirCpf() erro ao checar existencia diretorio cpf !")
    }
  }

  /* 
    Cria dir cpf  /data/data/host.exp.exponent/files/opseca/cpf
   */
  async function criaDirCpf(fdcpf: string) {
    try {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "opseca/" + fdcpf, { intermediates: true })
    } catch (error) {
      console.log(error + " criaDirCpf() erro ao criar dir cpf ")
    }
  }


  const setImage = (item: Product) => {

    if (item.source) {
      setModalVisible(true)
    } else {
      handleSelectImage(item)
    }
  }

  /* mover arquivos */
  const moveFile = async (sourceUri: string, destinationUri: string) => {
    try {
      await FileSystem.moveAsync({
        from: sourceUri,
        to: destinationUri,
      });
      //console.log('File moved successfully!');
    } catch (error) {
      //console.error('Error moving file:', error);
    }
  };

  async function handleSelectImage(item: Product) {
    const { granted } = await ImagePicker.getCameraPermissionsAsync()
    if (!granted) {
      await ImagePicker.requestCameraPermissionsAsync()
    } else {
      const result = await ImagePicker.launchCameraAsync()
      if (result.assets) {
        //console.log(FileSystem.documentDirectory);


        setProducts((prevProducts) => {
          const newProducts = [...prevProducts]
          const index = newProducts.indexOf(item)
          /* mover fotos */
          criaDirCpf
          const sourceUri = result.assets[0].uri;
          const destinationUri = FileSystem.documentDirectory + "opseca/" + param_cpf + '/' + param_cpf + item.nome + '.jpeg';

          // console.log("foto_state :" + foto)
          // console.log("sourceUri :" + sourceUri)
          // console.log("destinationUri : " + destinationUri)

          moveFile(sourceUri, destinationUri)
            .then(() => console.log(sourceUri+' File moved successfully! '+ destinationUri))
            .catch(error => console.error('Error moving file:', error));

          newProducts[index].source = destinationUri;
          /* /data/data/host.exp.exponent/files/cpf/cpf_imagem */

          return newProducts
        })
        //await AsyncStorage.setItem("fotos", JSON.stringify(products))
      }
    }
  }

  async function deletePhoto() {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts]
      newProducts[selectedIndex].source = undefined
      return newProducts
    })
    setModalVisible(false)
  }

  async function salvarObs() {
    if (obs.length == 0) {
      Alert.alert('Este Campo é Obrigatório');
    } else {
      updateObs();
    }
    setModalObs(false)
  }

  async function openModalObs() {
    setModalObs(true)
  }

  function handleCloseModal() {
    setModalVisible(false)
  }
  function closeModalObs() {
    setModalObs(false)
  }

  return (
    <View style={styles.container}>

      <View >
        <Text style={styles.title}>CPF: {param_cpf}</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={products}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ gap: 15 }}
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
                  console.log(item.nome+" item_flat")
                  setImage(item)
                  setFoto(item.nome.toString())
                  //console.log(item.nome)
                }}
              >
                {item.source ? (
                  <Image style={styles.image} source={{ uri: item.source }} />
                ) : (
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/camera.png")
                    }
                  />
                )}

                <View>
                  <Text>{item.source}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.obs}>
              <TouchableOpacity
                style={styles.button1}
                onPress={() => {
                  setId(String(params.id))
                  setFoto("img_" + item.nome)
                  searchObsImg("img_" + item.nome)
                  //searchObsImg()
                  //console.log(img+"-")
                  openModalObs()
                  //setObs(img)

                }}
              >
                <Text style={styles.buttonText}>Observações</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* deletar e ou tirar Foto */}
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
      onShow={()=> {searchObsImg(foto)}}
        visible={modalObs}
        transparent
        statusBarTranslucent
        style={{ flex: 1 }}
      >
        <View style={styles.containerModal}>
          <View style={styles.modalButton}>
            <View>
              <Text style={{ fontWeight: "bold" }} >Observações :</Text>
              <TextInput multiline={true}
                numberOfLines={10}
                style={{
                  height: "90%",
                  textAlignVertical: 'top',
                  backgroundColor: "#ffffff",
                  borderRadius: 5,
                }}
                clearButtonMode="always" onChangeText={setObs} maxLength={255}
                value={obs} />
            </View>
            <View style={styles.wrapperButtons}>
              <Pressable style={styles.button} onPress={salvarObs}>
                <Text style={styles.buttonText}>Salvar</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={closeModalObs}>
                <Text style={styles.buttonText}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
