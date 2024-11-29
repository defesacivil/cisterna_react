import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { initializaDb } from '../db/db';
import { CadatroDB, useCadastroDb } from '../db/useCadastroDb';
import { router } from 'expo-router';
import axios from 'axios';
import * as FileSystem from "expo-file-system"
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import * as Progress from 'react-native-progress';

export default function TabTwoScreen() {

  const cadastrodb = useCadastroDb()
  const [search, setSearch] = useState("");
  const [cadastros, setCadastros] = useState<CadatroDB[]>()
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  async function apiBusca() {
    litaFotos();
    //console.log(startUploads());
    // try {
    /* confere no sdc se existe o registro para não reenviar novamente * */
    //   cadastros?.map(value => {
    //     const response = axios.get('https://sdc.mg.gov.br/index.php/api/cisterna/busca/' + value.cpf).then((response1) => {
    //       //console.log(response1.data['data'].length);
    //       if (response1.data['data'].length == 0) {
    //         /* envia o registro para o SDC */
    //sinc(value);
    //         //console.log(sinc(value));
    //       } else {

    //       }
    //       //return response1;
    //     });
    //   });

    //   //Alert.alert("Sinc");
    // } catch (error) {
    //   console.log(error);
    // }
    startUploads();
  }

  /* Sincronizar dados para o sdc */
  async function sinc(data: CadatroDB) {
    await axios.post('https://sdc.mg.gov.br/index.php/api/cisterna/create', data, {
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error sending data: ", error);
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

  useEffect(() => {
    list()

    //startUploads()
  }, [search]);

  /**
   * filtra somente as imagens e carrega para upload
   */
  const loadImages = async () => {
    try {

      /** busca os diretorios cpf  */
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
          const imageUri = [];
          const imageFiles = await files.filter(file => file.endsWith('.jpeg') || file.endsWith('.png')); // Filtrar por imagens
          imageFiles.map((item_) => {
            imageUri.push({uri: FileSystem.documentDirectory + "opseca/"+dir.name,
                          fileName: item_,
                          type: ".jpeg"
                        })
            //console.log(item_)
            //console.log(imageUri)
          })
          setImages(imageUri); // popula useState setImages
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

  /* */
  const uploadImage1 = async (image) => {
    //const uri = image;
    // ... código para fazer o upload da imagem usando fetch ou XMLHttpRequest
    // Atualizar o estado uploadProgress com o progresso do upload

    //console.log(image)

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.fileName,
      type: image.type,
    });

    //console.log(formData.getAll('image'));
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Progress:
   ${progress}%`);
        // Aqui você pode atualizar um estado para exibir o progresso na interface do usuário
      },
    };
  
    try {
      const response = await axios.post('https://sdc.mg.gov.br/index.php/api/cisterna/uploadFotos', formData, config)
      
      console.log('Upload completo:', response.data);
    } catch (error) {
      console.error('Erro no upload:', error);
    }
  };


    // const xhr = new XMLHttpRequest();
    // xhr.upload.addEventListener('progress', (event) => {
    //   setUploadProgress((prevProgress) => ({
    //     ...prevProgress,
    //     [image.uri]: Math.round((event.loaded / event.total) * 100),
    //   }));
    // });

    // xhr.open('POST', 'https://sdc.mg.gov.br/index.php/api/cisterna/uploadFotos');
    // xhr.send(formData);
    // //console.log(xhr)
  

  /* inicio do upload */
  const startUploads = () => {
    loadImages();
    images.forEach(image => uploadImage1(image));
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


  function totalReg() {
    return cadastros?.length;
  }

  function listagem() {
    const data = list();

    return (
      <View key="0" style={styles.container}>

        <View key="1">
          <Text style={styles.titulo}>Lista de Registros</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={apiBusca}
          >
            <Text style={styles.buttonText}>Sincronizar Dados</Text>
          </TouchableOpacity>

          <View style={styles.progress}>
            <Text>Fixed Progress Value</Text>
            <Progress.Bar progress={uploadProgress} width={200} />
          </View>

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
                    const sanitCpf = item.cpf.replaceAll(`.`, '').replace(`-`, '')
                    router.push({ pathname: '/(tabs)/explore', params: { id: item.id, cpf: sanitCpf } })
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
    margin: 20,
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

  progress: {

  }
});
