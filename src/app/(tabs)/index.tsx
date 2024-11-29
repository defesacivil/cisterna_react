import { Image, StyleSheet, Platform, View } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import * as FileSystem from "expo-file-system"
import { useEffect } from "react"

export default function HomeScreen() {

  useEffect(() => {
    const createDirectory = async () => {
      const directoryUri = FileSystem.documentDirectory + 'opseca';
      try {
        const direct = await FileSystem.getInfoAsync(directoryUri);
        if(!direct.exists){
          await FileSystem.makeDirectoryAsync(directoryUri, { intermediates: true });
        }
        //console.log('Pasta criada com sucesso!');
      } catch (error) {
        //console.log('Erro ao criar pasta:', error);
      }
    };
  
    createDirectory();
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
        <ThemedText type="title"  style={{color: "red"}}>Aplicativo Teste</ThemedText>
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

      <View></View>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 150,
    width: 150,
    // bottom: 0,
    left: 5,
    top: 5,
    position: "absolute",
  },
})
