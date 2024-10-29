import React, { useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity, TextInputComponent, Alert } from 'react-native';

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
import { SQLiteProvider } from 'expo-sqlite';

import { initializaDb } from '../db/db';

import { useCadastroDb } from '../db/useCadastroDb';

const municipio = require('../assetdata/municipio.json');
const fornecimento = require('../assetdata/fornecimento');
const comunidade = require('../assetdata/comunidade.json');

export default function() {

  const [municipio, setMunicipio] = useState("");
  const [comunidade, setComunidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [localiza, setLocaliza] = useState("");
 
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dtNasc, setDtNasc] = useState("");
  const [cadUnico, setCadUnico] = useState("");
  const [qtdPessoa, setQtdPessoa] = useState("");
  const [renda, setRenda] = useState("");
  const [moradia, setMoradia] = useState("");
  
  const [compTelhado, setCompTelhado] = useState("");
  const [larguracompTelhado, setLarguraCompTelhado] = useState("");
  const [areaTotalTelhado, setAreaTotalTelhado] = useState("");
  const [numCaidaTelhado, setNumCaidaTelhado] = useState("");
  const [coberturaTelhado, setCoberturaTelhado] = useState("");
  
  const [existeFogaoLenha, setExisteFogaoLenha] = useState("");
  const [medidaTelhadoAreaFogao, setMedidaTelhadoAreaFogao] = useState("");
  const [testadaDispParteFogao, setTestadaDispParteFogao] = useState("");
  const [atendPipa, setAtendPipa] = useState("");
  const [respAtendPipa, setRespAtendPipa] = useState("");
  const [outrObs, setOutrObs] = useState("");

  const [nomeAgente, setNomeAgente] = useState("");
  const [cpfAgente, setCpfAgente] = useState("");
  const [nomeEng, setNomeEng] = useState("");
  const [creaEng, setCreaEng] = useState("");

  const cadastrodb = useCadastroDb()

  async function create() {
    try {

      const response = await cadastrodb.create({ nome });

      Alert.alert("Cadastro Realiza Com Sucesso ! " + response.insertedRowId)

    } catch (error) {
      console.log(error)
      Alert.alert("error" + error)

    }
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

            <Text style={styles1.title1}>Localização da imóvel</Text>

            <Text style={styles1.label}>Município : *</Text>
            <DropDownCs data={municipio}/>
            
            <Text style={styles1.label}>Comunidade : *</Text>
            <DropDownCs data={comunidade}/>

            <Text style={styles1.label}>Endereço Completo :</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setEndereco}/>
            
            <Text style={styles1.label}>Latitude/Longitude :{<LocationComponent />}</Text>



            <Text style={styles1.title1}>Dados Pessoais</Text>


            <Text style={styles1.label}>Nome Morador : *</Text>
            <TextInput
              style={styles1.input}
              placeholder="Nome"
              keyboardType={'default'}
              clearButtonMode="always"
              onChangeText={setNome}
              value={nome}
              maxLength={40}
            />

            <Text style={styles1.label}>CPF - do Morador : *</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" onChangeText={setCpf}/>

            <Text style={styles1.label}>Data Nascimento : *</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" onChangeText={setCadUnico}/>
            <Text style={styles1.label}>N Cad Único:</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />
            
            
            <Text style={styles1.label}>Quantidade de pessoas que residem no imóvel : *</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

            <Text style={styles1.label}>Renda familiar : *</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />


            <Text style={styles1.label}>Marque a situação da residência: *</Text>
            <RadioMoradia />

            <Text style={styles1.label}>Outros Descrever :</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />



            <Text style={styles1.title1}>Caracterização do imóvel</Text>


            <Text style={styles1.label}>Comprimento total do telhado (m) : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />
            
            <Text style={styles1.label}>Largura do Telhado (m) : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />
            
            <Text style={styles1.label}>Área total do telhado (m2) : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />
            
            <Text style={styles1.label}>Comprimeto da testada (m) : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />


            <Text style={styles1.label}>Número de caídas do telhado  : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

            <Text style={styles1.label}>Tipo de cobertura do imóvel:</Text>
            <RadioCobertura />

            <Text style={styles1.label}>Outros Descrever:</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

            
            <Text style={styles1.title1}>Dados Complementares</Text>
            

            <Text style={styles1.label}>Existe fogão a lenha?  : *</Text> 
            <RadioSN />

            <Text style={styles1.label}>Medida do telhado desconsiderando a área do fogão à lenha(m2): *</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

            <Text style={styles1.label}>Testada disponível, desconsiderando a parte do fogão à lenha(m) :</Text>
            <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" />

            
            <Text style={styles1.label}>Atendimento por caminhão Pipa ?: *</Text>
            <RadioSN />

            <Text style={styles1.label}>Órgão responsável pelo atendimento com caminhão Pipa : *</Text>
            <DropDownCs data={fornecimento} />

            <Text style={styles1.label}>Outros Descrever:</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

            <Text style={styles1.label}>16) São obrigatórias 3 (três) fotos do imóvel e 1 (uma) opcional, sendo:</Text>
            <ImagePickerScreen />


            <Text style={styles1.label}>Identificação dos Agentes :</Text>
            
            <Text style={styles1.label}>Nome do Agente : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

            <Text style={styles1.label}>CPF do Agente : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />
            
            <Text style={styles1.label}>Nome do Engenheiro responsável : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

            <Text style={styles1.label}>Crea do Engenheiro responsável : *</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" />

            <Text style={styles1.label}>Observações :</Text>
            <TextInput style={styles1.input} placeholder="" clearButtonMode="always" multiline />

            <TouchableOpacity
              style={styles1.button}
              onPress={create}>
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

