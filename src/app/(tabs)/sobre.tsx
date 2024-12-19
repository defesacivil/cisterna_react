import { Image, StyleSheet, Platform, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"

export default function Sobre() {

  

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
        {/* <ThemedText type="title" style={{ color: "red" }}>Aplicativo Teste</ThemedText> */}
        {/* <HelloWave /> */}

      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Gabinete Militar do Governador e Coordenadoria Estadual de Defesa Civil de MG</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Projeto Convivência com a Seca</ThemedText>
        {/* <HelloWave /> */}
      </ThemedView>

      <View style={{paddingTop: 300}}>
        <Text>Versão : 1.0.0.1 - 11/12/2024 - 23:30h</Text>
      </View>

      <View>
        <Text>Coordenação : Cap. PM Paulo Souza</Text>
        <Text>Desenvolvido por : FC Demetrio Passos</Text>
      </View>
      
        
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
