import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { initializaDb } from '../db/db';
import { CadatroDB, useCadastroDb } from '../db/useCadastroDb';
import { router } from 'expo-router';
import axios from 'axios';
import * as FileSystem from "expo-file-system"
import { Image, Text, TouchableOpacity, View, StyleSheet, Alert, Button, SafeAreaView } from "react-native"
import * as Progress from 'react-native-progress';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';
import SvgCircle from '@/components/SvgCircle';

export default function TabTwoScreen() {

  const router = useRouter();

  


  const cadastrodb = useCadastroDb()
  const [search, setSearch] = useState("");
  const [cadastros, setCadastros] = useState<CadatroDB[]>()
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [id, setId] = useState("");
  const [cpf, setCpf] = useState("");
  const [progress, setProgress] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [totalImagesUpload, setTotalImagesUpload] = useState(0);
  const [uploadAnimate, setUploadAnimate] = useState(false);
  const [textUpload, setTextUpload] = useState("");
  
  async function apiBusca() {

    litaFotos();
    //console.log(startUploads());
    try {
      /* confere no sdc se existe o registro para não reenviar novamente * */
      cadastros?.map(value => {
        const response = axios.get('https://sdc.mg.gov.br/index.php/api/cisterna/busca/' + value.cpf).then((response1) => {
          //console.log(response1.data['data'].length);
          if (response1.data['data'].length == 0) {
            /* envia o registro para o SDC */
            sinc(value);
            //console.log(sinc(value));
          } else {

          }
          //return response1;
        });
      });

      startUploads();
      setProgress;
    } catch (error) {
      console.log(error);
    }
  }


  /* Sincronizar dados para o sdc */
  async function sinc(data: CadatroDB) {
    await axios.post('https://sdc.mg.gov.br/index.php/api/cisterna/create', data, {
    })
      .then(function (response) {
        //console.log(response.data);
      })
      .catch(error => {
        console.error("Error enviando dados para sincronização data: ", error);
        Alert.alert(error);
      });
  }


  /* lista imagems */
  async function litaFotos() {
    try {
      const dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "opseca")
        .then(function (response) {
          //const dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory +"/opseca"+response
          //console.log(response)
        });
    } catch (error) {
    } finally {
    }
  }

  // useState(()=>{
  //   console.log(progress)
  // })

  useEffect(() => {
    list()
    //startUploads()
  }, [search]);

  useEffect(() => {
    
    setTotalImages(0);
    setTotalImagesUpload(0);
  }, []);


  /**
   * filtra somente as imagens e carrega para upload
   */
  /** 
   * 
   * busca os diretorios cpf
   * return array imageUri<state>
   * 
   *   */
  const loadImages = async () => {
    try {

      const cpfsDir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "opseca")
        .then(function (response) {
          return response.map((item, index) => ({
            name: item,
            key: index, // Adiciona uma chave única para o map
          }));
        })

      if (cpfsDir.length > 0) {
        /** faz leitura do diretorio cpf  */
        cpfsDir.map(async (dir) => {
          //console.log(dir.name + ": cpfs")
          const files = await readDirector(dir)
          let imageUris = [];
          const imageFiles = await files.filter(file => file.endsWith('.jpeg') || file.endsWith('.png')); // Filtrar por imagens
          imageFiles.map((item_) => {
            imageUris.push({
              uri: FileSystem.documentDirectory + "opseca/" + dir.name + "/" + item_,
              fileName: item_,
              type: "image/jpeg",
              cpf: dir.name
            })
          })
          setImages(imageUris); // popula useState setImages
          setTotalImages(totalImages + imageFiles.length);
        }
        )
      }
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      return [];
    }
  };

  /* ler a pasta cpf */
  const readDirector = async (dir) => {
    return await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'opseca/' + dir.name);
  }

  /**
   * Upload do array de imagens */
  const uploadImage1 = async (image) => {

    //console.log(image.fileName + " name")

    const formData = new FormData();

    formData.append('image', {
      uri: image.uri,
      type: 'image/jpeg',
      name: image.fileName

    });
    formData.append('cpf', image.cpf);
    formData.append('nome', image.fileName);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'e8e5a2271db9bad091acdf501d35fac86aab444d5c8549eccc9c78c4f89fbd00',
      },
      onUploadProgress: (progressEvent) => {
        //console.log(progressEvent)
        setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        //console.log(`Progress:${progress}%`);
      },
    };

    try {
      const response = await axios.post('https://sdc.mg.gov.br/index.php/api/cisterna/uploadFotos', formData, config)
    } catch (error) {
      console.error('Erro no upload:', error);
    }
    setProgress(0)
  };


  /** fazer upload a cada 30 segundos */
  useEffect(() => {

    const intervalId = setInterval(() => {
      const currentImage = images[currentIndex];
      if (currentImage) {
        uploadImage1(currentImage)
          .then(() => {
            //console.log('Upload realizado com sucesso!');
            setUploadAnimate(true);
            setTextUpload("Aguarde sincronizando os dados !");
            setCurrentIndex((prevIndex) => prevIndex + 1);
          })
          .catch((error) => {
            setTotalImagesUpload(totalImagesUpload - 1)
            console.error('Erro ao fazer upload:', error);
          });
        setTotalImagesUpload(totalImagesUpload + 1)
        if(totalImagesUpload == totalImages){
          setUploadAnimate(false);
          setTextUpload("");
        }
      }
    }, 15000); // 15 segundos


    return () => clearInterval(intervalId);
  }, [images, currentIndex]);

  /**
   *  Inicio do upload com array de IMAGENS
   */
  const startUploads = () => {
    loadImages(); // ler o diretorio de imagens do registro CPF popula o images[]

    // const numItem = images.length;

    // console.log(numItem);
    // images.forEach((item, index) => {
    //   if(index != numItem){
    //     uploadImage1(item); // faz o upload de cada imagen 
    //   }else {

    //   }
    // });

  };


  /* listar dados no SDC */
  async function listAll() {
    axios.get('https://sdc.mg.gov.br/index.php/api/cisterna/listall')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });

  }


  /* Deletar registro local */
  async function deletar(id: Number) {
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

  // useEffect(() => {
  //   list()

  // },
  //   [search])


  function irCadastro() {
    router.push({ pathname: '/(tabs)/explore', params: { cpf: cpf, id: id.toString() } })
    setIsModalEdit(false)
  }

  function irFotos() {
    router.push({ pathname: '/(tabs)/fotos', params: { cpf: cpf, id: id.toString() } })
    setIsModalEdit(false)
  }

  const toggleModal = () => {
    setIsModalEdit(!isModalEdit);
  };
  const openModalEdit = () => {
    console.log(isModalEdit)
    setIsModalEdit(true);
  };

  function totalReg() {
    return cadastros?.length;
  }

  function funcUploadAnimate(){
    setUploadAnimate(true);

  }

  

  function listagem() {
    const data = list();

    let viewRef;
    return (

      <View key="0" style={[styles.container, uploadAnimate && styles.loadind]}>
      
        <View key="1">
          <Text style={styles.titulo}>Lista de Registros</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={apiBusca}
          >
            <Text style={styles.buttonText}>Sincronizar Dados</Text>
          </TouchableOpacity>

          <View style={styles.progress}>
            <Progress.Bar progress={progress} width={null} height={20} color={"#FFC300"} />
          </View>
          <View style={styles.progress}>
            <Text>{textUpload}</Text>
          </View>
          <View style={styles.total}>

            <Text style={{ alignItems: 'flex-start' }}>Total Registros {totalReg()}</Text>
            <Text>    |    </Text>
            <Text style={{ alignItems: 'flex-end' }}>Total Imagens {totalImages}/{totalImagesUpload}</Text>

          </View>
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
                    const sanitCpf = item.cpf.replaceAll(`.`, '').replace(`-`, '')

                    // abrir modal
                    toggleModal()
                    setId(item.id)
                    setCpf(sanitCpf)
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
                {/* <Image
                    style={styles.icon}
                    source={require("../../../assets/images/check.png")}
                  /> */}
              </View>
            </View>
          </View>
        ))}
        {/* Modal acesso arquivo e fotos  */}
        <Modal isVisible={isModalEdit}>
          <View style={styles.modalContent}>
            <Text style={{ padding: 10, fontSize: 20, textAlign: 'center' }}>Você quer editar qual parte do Registro ?</Text>
            <View style={{ padding: 5 }}>
              <Button title="Cadastro" onPress={irCadastro} />
            </View>
            <View style={{ padding: 5 }}>
              <Button title="Fotos" onPress={irFotos} />
            </View>
            <View style={{ paddingTop: 30 }}>
              <Button title="Cancelar" onPress={() => { setIsModalEdit(false) }} />
            </View>
          </View>
        </Modal>
      </View>

    );

  };

  return (
    listagem()
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
    margin: 5,
    flexDirection: 'row'
  },
  op: {

  },
  link: {
    color: "blue",
    verticalAlign: "middle",

  },
  nome: {
    width: 270,
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
    //padding: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  button1: {
    margin: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    //padding: 24,
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

  progress: {
    margin: 4


  },
  modalContent: {
    height: 400,
    backgroundColor: 'white',
    padding: 0,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadind :{
    backgroundColor: "#FFC300",
    
  }
});
