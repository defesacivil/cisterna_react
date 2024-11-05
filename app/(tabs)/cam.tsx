import { FontAwesome } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Alert, Button, FlatList, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { measure } from 'react-native-reanimated';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { useGlobalSearchParams } from 'expo-router';
import { requestPermissionsAsync, createAssetAsync } from 'expo-media-library';


export default function () {


  const camRef = useRef(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  const nome = useGlobalSearchParams();

  const requestFilePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissão abrir Camera',
          message:
            'Você precisa aceitar abrir a camera !',
          buttonNeutral: 'Pergunte deposi',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
    } catch (error) {

    }
  };

  requestFilePermission()



  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


  const imageName = `${nome.nomeFoto}.jpg`;
  const imgUri = FileSystem.documentDirectory + "opseca/" + imageName;

  async function takePickture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();

      // Save the file to the new location
      await FileSystem.copyAsync({
        from: data.uri,  // Original URI: this is the uri taken from ImagePicker (response.assets[0].uri)
        to: imgUri,           // New location
      });

      // create a new asset based on the new location and save it with new custom name
      const renamedAsset = await MediaLibrary.createAssetAsync(imgUri);
      await MediaLibrary.createAlbumAsync("Mediciones", renamedAsset, false);

    }

    await router.push('/(tabs)/fotos');

  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }



  return (

    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>

      <TouchableOpacity style={styles.button1} onPress={takePickture} >
        <FontAwesome name='camera' size={23} color="#FFF" />
      </TouchableOpacity>
    </View>


  );
}

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
