import { Image, StyleSheet, Platform, View, Text, TextInput, TouchableOpacity } from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import * as FileSystem from "expo-file-system"
import { useEffect, useState } from "react"
import MaskInput, { Masks } from "react-native-mask-input"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HomeScreen() {

  const [nomeAgente, setNomeAgente] = useState("");
  const [cpfAgente, setCpfAgente] = useState("");
  const [nomeEng, setNomeEng] = useState("");
  const [creaEng, setCreaEng] = useState("");
  const [btnEntrarVisivel, setBtnEntrarVisivel] = useState(true);

  function salvarSession(data: []) {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('user',
          JSON.stringify(data));
      } catch (e) {
        console.log(e)
      }
    };
    return storeData;
  }

  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      return value;
    } catch (e) {
      console.error('error ao buscar ', e)
    }
  };





  useEffect(() => {
    const createDirectory = async () => {
      const directoryUri = FileSystem.documentDirectory + 'opseca';
      try {
        const direct = await FileSystem.getInfoAsync(directoryUri);
        if (!direct.exists) {
          await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
        }
        //console.log('Pasta criada com sucesso!');
      } catch (error) {
        //console.log('Erro ao criar pasta:', error);
      }
    };

    createDirectory();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getDataUser();
      if (user) {
        setNomeAgente(JSON.parse(user)[0])
        setCpfAgente(JSON.parse(user)[1])
        setNomeEng(JSON.parse(user)[2])
        setCreaEng(JSON.parse(user)[3])
        setBtnEntrarVisivel(true)
      } else {
        setBtnEntrarVisivel(true)
      }
    }
    fetchData();
  }, []);


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("../../../assets/images/logo_defesa_civil.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title" style={{ color: "red" }}>Aplicativo Teste</ThemedText>
        {/* <HelloWave /> */}

      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Projeto Convivência com a Seca</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>


      {/* <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
        Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
        Press{' '}
        <ThemedText type="defaultSemiBold">
        {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
        </ThemedText>{' '}
        to open developer tools.
        </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
        Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
        When you're ready, run{' '}
        <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
        <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
        <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
        <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView> */}
      <View>

        <Text style={styles.label}>Nome do Agente</Text>
        <TextInput style={styles.input} value={nomeAgente} onChangeText={setNomeAgente} />

        <Text style={styles.label}>CPF do Agente</Text>
        <MaskInput
          style={styles.input}
          value={cpfAgente}
          onChangeText={(masked, unmasked) => {
            setCpfAgente(masked); // you can use the unmasked value as well
          }}
          mask={Masks.BRL_CPF}
        />

        <Text style={styles.label}>Nome do Engenheiro</Text>
        <TextInput style={styles.input} value={nomeEng} onChangeText={setNomeEng} />

        <Text style={styles.label}>CREA</Text>
        <TextInput style={styles.input} value={creaEng} onChangeText={setCreaEng} />
      </View>
      {btnEntrarVisivel && (
        <TouchableOpacity
          style={styles.button}
          onPress={salvarSession([nomeAgente, cpfAgente, nomeEng, creaEng])}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>)}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 100,
    width: 100,
    // bottom: 0,
    left: 25,
    top: 25,
    position: "static",
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,

  },
  input: {
    margin: 5,
    paddingLeft: 5,
    height: 50,
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    fontSize: 16,
    alignItems: 'stretch',
  },
  label: {
    margin: 5

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
})
