import React, { useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity, TextInputComponent } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import LocationComponent from '@/components/Location';
import ImagePickerScreen from '@/components/Fotos';
import * as ImagePicker from 'expo-image-picker';
import RadioSN from '@/components/RadioSN';

import RadioMoradia from '@/components/RadioMoradia';

import DropDownCs from '@/components/DropDownCs';
import RadioCobertura from '@/components/RadioCobertura';

const municipio = require('../assetdata/municipio.json');
const fornecimento = require('../assetdata/fornecimento');

import * as SQLite from 'expo-sqlite';


const db = await SQLite.openDatabaseAsync('databaseName');

// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Please note that `execAsync()` does not escape parameters and may lead to SQL injection.
await db.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
`);




export default function TabTwoScreen() {

  const [nome, setNome] = useState();
  function handleNomeChange(nome) { setNome(nome); }

  function handleSalvarPress() {


  }
  


  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Formulário de pesquisa
          Caracterização Técnica</ThemedText>
      </ThemedView>

      <View style={styles1.container}>

        <View style={styles1.inputContainer}>

          <Text style={styles1.title1}>Dados do Responsável pelo Imóvel</Text>

          <Text style={styles1.label}>1) Latitude/Longitude :{<LocationComponent />}</Text>

          <Text style={styles1.label}>2) Nome completo :</Text>
          <TextInput
            style={styles1.input}
            placeholder=""
            keyboardType={'default'}
            clearButtonMode="always"
            onChangeText={handleNomeChange}
            maxLength={40}
          />

          <Text style={styles1.label}>3) CPF - Insira somente os números :</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

          <Text style={styles1.label}>4) Quantidade de pessoas que residem no imóvel :</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

          <Text style={styles1.label}>5) Renda familiar :</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />


          <Text style={styles1.label}>6) Marque a situação da residência:</Text>
          <RadioMoradia />

      
          <Text style={styles1.title1}>Localização da imóvel</Text>

      
          <DropDownCs data={municipio} />

          <Text style={styles1.label}>8) Nome da Comunidade :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

          <Text style={styles1.label}>9) Endereço Completo :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

      
          <Text style={styles1.title1}>Caracterização do imóvel</Text>

          <Text style={styles1.label}>10) Informe a área total do telhado (m²) :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

          <Text style={styles1.label}>11) Informe o comprimento total das testadas :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

          <Text style={styles1.label}>12) Quantas caídas possui o telhado ? :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />


          <Text style={styles1.label}>13) Marque o material da cobertura do imóvel:</Text>
          
          
          <RadioCobertura/>

          <Text style={styles1.label}>Outros Descrever:</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

          <Text style={styles1.label}>14) Existe fogão a lenha próximo a cozinha? :</Text>
          <RadioSN />

          <Text style={styles1.label}>14.1) Caso houver fogão a lenha, informe a metragem do telhado a ser desconsiderada :</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

          <Text style={styles1.label}>14.2) Caso houver fogão a lenha, informe o comprimento da calha a ser desconsiderada :</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

          <Text style={styles1.label}>15) Na residência há fornecimento de água por meio de caminhão pipa? :</Text>
          <RadioSN />

          <Text style={styles1.label}>15.1) Selecione a opção do responsável pelo fornecimento de água :</Text>
          <DropDownCs data={fornecimento} />

          <Text style={styles1.label}>16) São obrigatórias 3 (três) fotos do imóvel e 1 (uma) opcional, sendo:</Text>
          <ImagePickerScreen />


          <Text style={styles1.label}>Nome do agente responsável pela pesquisa :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

          <Text style={styles1.label}>Matrícula do agente responsável pela pesquisa :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

          <Text style={styles1.label}>Observações :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" multiline/>

          <TouchableOpacity
            style={styles1.button}
            onPress={handleSalvarPress}>
            <Text style={styles1.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>


        <StatusBar style="light" />
      </View>

    </ParallaxScrollView >
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
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
  },
  title: {
    color: '',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
    borderBottomWidth: 1.0,
  },
  label: {
    backgroundColor: '#fff',
    fontSize: 16,
    alignItems: 'stretch',
    marginTop: 20,

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
  container_radio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
  },
  radioButtonText: {
    fontSize: 16,
  },
  title1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,

  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label_info: {
    fontWeight: 'bold',
  }


});

