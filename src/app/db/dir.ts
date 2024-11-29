import FileSystem from 'expo-file-system';

export async function Dir() {

async function createDir() {
  await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+"seca");
  
}

  try {
    const dir = await FileSystem.getInfoAsync(FileSystem.documentDirectory+"seca")
    .then(function (response){
      if(!response.exists){
        createDir();
        //console.log(response);
      }
    })
    
  } catch (error) {
    console.log(error)
  }
}

