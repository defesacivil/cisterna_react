import React, { useEffect, useMemo, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity, FlatList, TextInputComponent, Alert, Pressable } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import LocationComponent from '@/components/Location';
import ImagePickerScreen from '@/components/Fotos';
import * as ImagePicker from 'expo-image-picker';
import MaskInput, { Masks } from 'react-native-mask-input';
import { SQLiteProvider } from 'expo-sqlite';
import { initializaDb } from '../db/db';
import { useCadastroDb } from '../db/useCadastroDb';
import RNPickerSelect from 'react-native-picker-select';
import * as Location from 'expo-location';
import { Tabs, useGlobalSearchParams } from 'expo-router';

import { useRouter } from 'expo-router';

const dropMunicipio = require('../assetdata/municipio.json');
const fornecimento = require('../assetdata/fornecimento');
const dropComunidade = require('../assetdata/comunidade.json');
const data_moradia = require('../assetdata/moradia.json');
const data_cobertura = require('../assetdata/cobertura.json');



export default function () {

  
  const [selectedValue, setSelectedValue] = useState('');
  
  const [municipio, setMunicipio] = useState("");
  const [comunidade, setComunidade] = useState("");
  const [endereco, setEndereco] = useState("");
  const [localiza, setLocaliza] = useState("");
  
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dtNasc, setDtNasc] = useState("");
  const [cadUnico, setCadUnico] = useState("");
  const [qtdPessoa, setQtdPessoa] = useState("");
  const [renda, setRenda] = useState("");
  const [moradia, setMoradia] = useState("");
  const [outroMoradia, setOutroMoradia] = useState("");
  
  const [compTelhado, setCompTelhado] = useState("");
  const [larguracompTelhado, setLarguraCompTelhado] = useState("");
  const [areaTotalTelhado, setAreaTotalTelhado] = useState("");
  const [compTestada, setCompTestada] = useState("");
  const [numCaidaTelhado, setNumCaidaTelhado] = useState("");
  const [coberturaTelhado, setCoberturaTelhado] = useState("");
  const [coberturaOutros, setCobertOutros] = useState("");
  
  const [existeFogaoLenha, setExisteFogaoLenha] = useState("");
  const [medidaTelhadoAreaFogao, setMedidaTelhadoAreaFogao] = useState("");
  const [testadaDispParteFogao, setTestadaDispParteFogao] = useState("");
  const [atendPipa, setAtendPipa] = useState("");
  const [outroAtendPipa, setOutroAtendPipa] = useState("");
  const [respAtendPipa, setRespAtendPipa] = useState("");
  const [outrObs, setOutrObs] = useState("");
  
  const [nomeAgente, setNomeAgente] = useState("");
  const [cpfAgente, setCpfAgente] = useState("");
  const [nomeEng, setNomeEng] = useState("");
  const [creaEng, setCreaEng] = useState("");
  
  //console.log("000.000.000-00".replace(". -", ""));

  const param = useGlobalSearchParams();
  
  const cadastrodb = useCadastroDb()

  useState(() => {
    if(param.id) {
      setId(param.id)
      console.log(param.id)
      
      
      //searchById(param.id);
      
      //console.log(data)
    }
  })
  
  const router = useRouter();

  const navigateToSettings = (cpf2: String, id: String) => {    
    const cpf1 = cpf2.replaceAll(`.`, '').replace(`-`, '')
    // Navega para a aba de configurações
    //router.push('/(tabs)/fotos');
    router.push({ pathname: '/(tabs)/fotos', params: { cpf: cpf1, id: id } })
  };
  
async function searchById(id:number) {

  const response = await cadastrodb.searchById(id)
  
}
  
  async function create() {
    try {
      
      const response = await cadastrodb.create({
        municipio,
        comunidade,
        endereco,
        localiza,
        nome,
        cpf,
        dtNasc,
        cadUnico,
        qtdPessoa: Number(qtdPessoa),
        renda: Number(renda),
        moradia,
        outroMoradia,
        compTelhado: Number(compTelhado),
        larguracompTelhado: Number(larguracompTelhado),
        areaTotalTelhado: Number(areaTotalTelhado),
        compTestada: Number(compTestada),
        numCaidaTelhado: Number(numCaidaTelhado),
        coberturaTelhado: Number(coberturaTelhado),
        coberturaOutros,
        existeFogaoLenha,
        medidaTelhadoAreaFogao: Number(medidaTelhadoAreaFogao),
        testadaDispParteFogao: Number(testadaDispParteFogao),
        atendPipa,
        outroAtendPipa,
        respAtendPipa,
        outrObs,
        nomeAgente,
        cpfAgente,
        nomeEng,
        creaEng
      })

      Alert.alert("Cadastro Realiza Com Sucesso ! " + response.insertedRowId)

      navigateToSettings(cpf, response.insertedRowId)


    } catch (error) {
      console.log(error)
      Alert.alert("error" + error)

    }
  }

   console.log(LocationComponent.toString())
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

          <Text style={styles1.label}>Município : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => setMunicipio(value)}
              value={municipio}
              items={dropMunicipio}
              placeholder={{ label: 'Select o Município..', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Comunidade : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => setComunidade(value)}
              value={comunidade}
              items={dropComunidade}
              placeholder={{ label: 'Select o Comunidade..', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Endereço Completo :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setEndereco} maxLength={50} />

          <Text style={styles1.label}>Localização :</Text>
          <Text style={styles1.label} >Latitude/Longitude :{<LocationComponent />}</Text>



          <Text style={styles1.title1}>Dados Pessoais</Text>


          <Text style={styles1.label}>Nome Morador : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="Nome" keyboardType={'text'} clearButtonMode="always" onChangeText={setNome} value={nome} maxLength={40} />

          <Text style={styles1.label}>CPF - do Morador : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            value={cpf}
            onChangeText={(masked, unmasked) => {
              setCpf(masked); // you can use the unmasked value as well

            }}
            mask={Masks.BRL_CPF}
          />

          <Text style={styles1.label}>Data Nascimento : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            value={dtNasc}
            onChangeText={(masked, unmasked) => {
              setDtNasc(masked); // you can use the unmasked value as well

            }}
            mask={Masks.DATE_DDMMYYYY}
          />

          <Text style={styles1.label}>N Cad Único:</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" onChangeText={setCadUnico} maxLength={15}/>

          <Text style={styles1.label}>Quantidade de pessoas que residem no imóvel : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" onChangeText={setQtdPessoa} maxLength={2}/>

          

          <Text style={styles1.label}>Renda familiar : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            value={renda}
            onChangeText={(masked, unmasked) => {
              setRenda(masked); // you can use the unmasked value as well

            }}
            mask={Masks.BRL_CURRENCY}
          />
          <Text style={styles1.label}>Tipo de Moradia <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setMunicipio(value)]}
              value={selectedValue}
              items={data_moradia}
              placeholder={{ label: 'Tipo de Moradia..', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Outros Descrever :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setOutroMoradia} maxLength={120} />


          <Text style={styles1.title1}>Caracterização do imóvel</Text>


          <Text style={styles1.label}>Comprimento total do telhado (m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setCompTelhado} keyboardType={'numeric'} maxLength={2}/>

          <Text style={styles1.label}>Largura do Telhado (m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setLarguraCompTelhado} keyboardType={'numeric'} maxLength={2}/>

          <Text style={styles1.label}>Área total do telhado (m2) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setAreaTotalTelhado} keyboardType={'numeric'} maxLength={2}/>

          <Text style={styles1.label}>Comprimeto da testada (m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setCompTestada} keyboardType={'numeric'} maxLength={2}/>

          <Text style={styles1.label}>Número de caídas do telhado  : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setNumCaidaTelhado} keyboardType={'numeric'} maxLength={2}/>

          <Text style={styles1.label}>Tipo de cobertura do imóvel:</Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setCoberturaTelhado(value)]}
              value={selectedValue}
              items={data_cobertura}
              placeholder={{ label: 'Tipo de Cobertura..', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Outros Descrever:</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setCobertOutros} maxLength={120}/>


          <Text style={styles1.title1}>Dados Complementares</Text>


          <Text style={styles1.label}>Existe fogão a lenha?  : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setExisteFogaoLenha(value)]}
              value={selectedValue}
              items={[{
                "label": "Não",
                "value": "0"
              },
              {
                "label": "Sim",
                "value": "1"
              }]}
              placeholder={{ label: 'Selecione uma Opção', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Medida do telhado desconsiderando a área do fogão à lenha(m2): <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" onChangeText={setMedidaTelhadoAreaFogao} maxLength={2}/>

          <Text style={styles1.label}>Testada disponível, desconsiderando a parte do fogão à lenha(m) :</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'} clearButtonMode="always" onChangeText={setTestadaDispParteFogao}  maxLength={2}/>


          <Text style={styles1.label}>Atendimento por caminhão Pipa ?: <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setAtendPipa(value)]}
              value={selectedValue}
              items={[{
                "label": "Não",
                "value": "0"
              },
              {
                "label": "Sim",
                "value": "1"
              },]}
              placeholder={{ label: 'Selecione uma Opção', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Órgão responsável pelo atendimento com caminhão Pipa : *</Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
          <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setRespAtendPipa(value)]}
              value={selectedValue}
              items={fornecimento}
              placeholder={{ label: 'Selecione uma Opção', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Outros Descrever:</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setOutroAtendPipa} maxLength={120}/>

          <Text style={styles1.label}>Identificação dos Agentes :</Text>

          <Text style={styles1.label}>Nome do Agente : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setNomeAgente} maxLength={50}/>

          <Text style={styles1.label}>CPF do Agente : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            value={cpfAgente}
            onChangeText={(masked, unmasked) => {
              setCpfAgente(masked); // you can use the unmasked value as well

            }}
            mask={Masks.BRL_CPF}
          />

          <Text style={styles1.label}>Nome do Engenheiro responsável : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setNomeEng} maxLength={50}/>

          <Text style={styles1.label}>Crea do Engenheiro responsável : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setCreaEng} maxLength={15}/>

          <Text style={styles1.label}>Observações :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" multiline onChangeText={setOutrObs} maxLength={120}/>

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
    gap: 3,
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
});

const styles1 = StyleSheet.create({
  container: {
    margin: 0,

    // flex: 2,
    // backgroundColor: '#D93600',
    // alignItems: 'center',
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
    width: '100%',
    padding: 5,
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

