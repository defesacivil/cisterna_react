import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert, Button, Text } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import MaskInput, { Masks } from 'react-native-mask-input';
import { useCadastroDb } from '../db/useCadastroDb';
import RNPickerSelect from 'react-native-picker-select';
import * as Location from 'expo-location';
import { useGlobalSearchParams } from 'expo-router';

import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dropMunicipio = require('../assetdata/municipio.json');
const fornecimento = require('../assetdata/fornecimento');
const dropComunidade = require('../assetdata/comunidade.json');
const data_moradia = require('../assetdata/moradia.json');
const data_cobertura = require('../assetdata/cobertura.json');

let background = "";

export default function () {

  const router = useRouter();

  var params = useGlobalSearchParams();

  var param_id = (params.id) ? params.id : "";

  const dat =
  {
    'municipio': 'ALMENARA',
    'endereco': 'Rua Dom Helder',
    'nome': 'Jose das couves',
    'cpf': '001.002.003-99',
    'dtNasc': '09/01/2010',
    'cadUnico': '112345',
    'qtdPessoa': '2',
    'renda': '1200.00',
    'outroMoradia': 'casa de amigos',
    'compTelhado': '1,2',
    'larguracompTelhado': '2',
    'areaTotalTelhado': '5',
    'compTestada': '3',
    'numCaidaTelhado': '2',
    'coberturaOutros': 'isopor',
    'medidaTelhadoAreaFogao': '5',
    'testadaDispParteFogao': '4',
    'outroAtendPipa': 'prefeitura',
    'nomeAgente': 'Tiao da Gloria',
    'cpfAgente': '009.345.654-45',
    'nomeEng': 'Roberto Santos',
    'creaEng': '45454',
    'outrObs': 'observacoes teste',
  };


  const [selectedValue, setSelectedValue] = useState('');

  const [municipio, setMunicipio] = useState("");
  const [comunidade, setComunidade] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [endereco, setEndereco] = useState("");
  const [localiza, setLocaliza] = useState("");

  const [id, setId] = useState(param_id);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState(params.cpf);
  const [dtNasc, setDtNasc] = useState("");
  const [tel, setTel] = useState("");
  const [cadUnico, setCadUnico] = useState("");
  const [qtdPessoa, setQtdPessoa] = useState("");
  const [renda, setRenda] = useState(0);
  const [moradia, setMoradia] = useState("");
  const [outroMoradia, setOutroMoradia] = useState("");

  const [compTelhado, setCompTelhado] = useState("");
  const [larguracompTelhado, setLarguraCompTelhado] = useState("");
  const [areaTotalTelhado, setAreaTotalTelhado] = useState("");
  const [compTestada, setCompTestada] = useState("");
  const [numCaidaTelhado, setNumCaidaTelhado] = useState("");
  const [coberturaTelhado, setCoberturaTelhado] = useState("");
  const [coberturaOutros, setCobertOutros] = useState("");

  const [existeFogaoLenha, setExisteFogaoLenha] = useState("0");
  const [medidaTelhadoAreaFogao, setMedidaTelhadoAreaFogao] = useState("");
  const [testadaDispParteFogao, setTestadaDispParteFogao] = useState("");
  const [atendPipa, setAtendPipa] = useState("0");
  const [outroAtendPipa, setOutroAtendPipa] = useState("");
  const [outrObs, setOutrObs] = useState("");

  const [nomeAgente, setNomeAgente] = useState("");
  const [cpfAgente, setCpfAgente] = useState("");
  const [nomeEng, setNomeEng] = useState("");
  const [creaEng, setCreaEng] = useState("");
  const [funcBotao, setFuncBotao] = useState("");

  const [isChRespAtPipaDefesaCivil, setChRespAtPipaDefesaCivil] = useState(false);
  const [isChRespAtPipaExercito, setChRespAtPipaExercito] = useState(false);
  const [isChRespAtPipaParticular, setChRespAtPipaParticular] = useState(false);
  const [isChRespAtPipaPrefeitura, setChRespAtPipaPrefeitura] = useState(false);
  const [isChRespAtPipaOutros, setChRespAtPipaOutros] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [moradiaOutrosVisivel, setMoradiaOutrosVisivel] = useState(false);
  const [tpCoberturaOutVisivel, setTpCoberturaOutVisivel] = useState(false);
  const [existFogaoLenhaVisivel, setExistFogaoLenhaVisivel] = useState(false);
  const [atendPipaOutroVisivel, setAtendPipaOutroVisivel] = useState(false);

  const cadastrodb = useCadastroDb()


  const [errorMsg, setErrorMsg] = useState(null);


  /** pegar dados sessao usuario  */
  const getDataUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      return value;
    } catch (e) {
      // error reading value
    }
  };

  //console.log(getDataUser);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleConfirm = () => {
    // Perform the action here
    //console.log('Confirmed!');
    getLatLong();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  /* pega Lat Long */
  function getLatLong() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let localiza = await Location.getCurrentPositionAsync({});
      setLocaliza("lat: " + localiza.coords.latitude + " Long: " + localiza.coords.longitude);
    })();
  }


  /* Outros moradia visivel */
  function isMoradiaOutroVisivel(tp: string) {
    if (tp === 'outros') {
      setMoradiaOutrosVisivel(true);
    } else {
      setMoradiaOutrosVisivel(false)
    }
  }

  /* Outros tipo cobertura visivel */
  function isTpCoberturaOutroVisivel(tp: string) {
    if (tp === 'outros') {
      setTpCoberturaOutVisivel(true);
    } else {
      setTpCoberturaOutVisivel(false)
    }
  }

  /* Outros Existe fogao a lenha visivel */
  function isExistFogaoVisivel(tp: string) {
    console.log(tp)
    if (tp == '1') {
      setExistFogaoLenhaVisivel(true);
    } else {
      setExistFogaoLenhaVisivel(false)
    }
  }

  /* outro Atendimenti pipa */
  function isAtendPipaOutroVisivel(tp: string) {
    if (tp === '1') {
      setAtendPipaOutroVisivel(true);
    } else {
      setAtendPipaOutroVisivel(false)
    }
  }

  // Get location 
  useEffect(() => {
    getLatLong();
  }, []);

  useEffect(() => {
    if (param_id) {
      setFuncBotao("Atualizar")
      background = "#87CEFA";

      searchById(Number(param_id)).then(async dados => {
        //console.log(dados?.renda)
        if (dados != null) {
          console.log(dados.localiza)

          setId(dados.id);
          setMunicipio(dados.municipio);
          setComunidade(dados.comunidade);
          setEndereco(dados.endereco);
          setLocaliza(dados.localiza)
          setNome(dados.nome);
          setCpf(dados.cpf);
          setDtNasc(dados.dtNasc);
          setTel(dados.tel);
          setCadUnico(dados.cadUnico);
          setQtdPessoa(dados.qtdPessoa.toString()),
            setRenda(dados.renda.toString());
          setMoradia(dados.moradia);
          setOutroMoradia(dados.outroMoradia);
          setCompTelhado(dados.compTelhado.toString());
          setLarguraCompTelhado(dados.larguracompTelhado.toString());
          setAreaTotalTelhado(dados.areaTotalTelhado.toString());
          setCompTestada(String(dados.compTestada));
          setNumCaidaTelhado(dados.numCaidaTelhado.toString());
          setCoberturaTelhado(dados.coberturaTelhado);
          setCobertOutros(dados.coberturaOutros);
          setExisteFogaoLenha(dados.existeFogaoLenha);
          setMedidaTelhadoAreaFogao(String(dados.medidaTelhadoAreaFogao));
          setTestadaDispParteFogao(dados.testadaDispParteFogao.toString());
          setAtendPipa(dados.atendPipa);
          setOutroAtendPipa(dados.outroAtendPipa);
          setChRespAtPipaDefesaCivil(Boolean(dados.respAtDefesaCivil));
          setChRespAtPipaExercito(Boolean(dados.respAtExercito));
          setChRespAtPipaParticular(Boolean(dados.respAtParticular));
          setChRespAtPipaPrefeitura(Boolean(dados.respAtPrefeitura));
          setChRespAtPipaOutros(Boolean(dados.respAtOutros));
          setNomeAgente(dados.nomeAgente);
          setCpfAgente(dados.cpfAgente);
          setNomeEng(dados.nomeEng);
          setCreaEng(dados.creaEng);
          setOutrObs(dados.outrObs);
        }
      });

    } else {
      setId("");
      setMunicipio("");
      setComunidade("");
      setEndereco("");
      setNome("");
      setCpf("");
      setDtNasc("");
      setTel("");
      setCadUnico("");
      setQtdPessoa(""),
        setRenda(0);
      setMoradia("");
      setOutroMoradia("");
      setCompTelhado("");
      setLarguraCompTelhado("");
      setAreaTotalTelhado("");
      setCompTestada("");
      setNumCaidaTelhado("");
      setCoberturaTelhado("");
      setCobertOutros("");
      setExisteFogaoLenha("0");
      setMedidaTelhadoAreaFogao("");
      setTestadaDispParteFogao("");
      setAtendPipa("0");
      setChRespAtPipaDefesaCivil(false)
      setChRespAtPipaExercito(false)
      setChRespAtPipaParticular(false)
      setChRespAtPipaPrefeitura(false)
      setChRespAtPipaOutros(false)
      setOutroAtendPipa("");
      setNomeAgente("");
      setCpfAgente("");
      setNomeEng("");
      setCreaEng("");
      setOutrObs("");

      setFuncBotao("Salvar")

    }
  }, [param_id]);

  // getDataUser
  useEffect(() => {
    const fetchData = async () => {
      const user = await getDataUser();
      setNomeAgente(JSON.parse(user)[0])
      setCpfAgente(JSON.parse(user)[1])
      setNomeEng(JSON.parse(user)[2])
      setCreaEng(JSON.parse(user)[3])
    }
    fetchData();
  }, []);

  const navigateToSettings = (cpf2: String, id) => {
    const cpf1 = cpf2.replaceAll(`.`, '').replace(`-`, '')
    // Navega para a aba de configurações
    //router.push('/(tabs)/fotos');
    router.push({ pathname: '/(tabs)/fotos', params: { cpf: cpf1, id: id.toString() } })
  };

  async function searchById(id: number) {
    const response = await cadastrodb.searchById(id)
    return response;
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
        tel,
        cadUnico,
        qtdPessoa,
        renda,
        moradia,
        outroMoradia,
        compTelhado,
        larguracompTelhado,
        areaTotalTelhado,
        compTestada,
        numCaidaTelhado,
        coberturaTelhado,
        coberturaOutros,
        existeFogaoLenha,
        medidaTelhadoAreaFogao,
        testadaDispParteFogao,
        atendPipa,
        outroAtendPipa,
        isChRespAtPipaDefesaCivil,
        isChRespAtPipaExercito,
        isChRespAtPipaParticular,
        isChRespAtPipaPrefeitura,
        isChRespAtPipaOutros,
        outrObs,
        nomeAgente,
        cpfAgente,
        nomeEng,
        creaEng
      })

      Alert.alert("Cadastro Realiza Com Sucesso ! " + response.insertedRowId)
      const id_last = Number(response.insertedRowId)
      setId(id_last);
      setCpf(cpf);

      navigateToSettings(cpf, id_last)

    } catch (error) {
      console.log(error)

    }
  }


  async function atualiza() {
    try {

      console.log(id)
      const response = await cadastrodb.update({
        id: id,
        municipio,
        comunidade,
        endereco,
        localiza,
        nome,
        cpf,
        dtNasc,
        tel,
        cadUnico,
        qtdPessoa,
        renda,
        moradia,
        outroMoradia,
        compTelhado,
        larguracompTelhado,
        areaTotalTelhado,
        compTestada,
        numCaidaTelhado,
        coberturaTelhado,
        coberturaOutros,
        existeFogaoLenha,
        medidaTelhadoAreaFogao,
        testadaDispParteFogao,
        atendPipa,
        outroAtendPipa,
        isChRespAtPipaDefesaCivil,
        isChRespAtPipaExercito,
        isChRespAtPipaParticular,
        isChRespAtPipaPrefeitura,
        isChRespAtPipaOutros,
        outrObs,
        nomeAgente,
        cpfAgente,
        nomeEng,
        creaEng
      });


      var id_last = Number(id)
      setId(id_last);
      setCpf(cpf);

      Alert.alert("Cadastro Atualizado Com Sucesso ! " + id)
      navigateToSettings(cpf, String(id))

    } catch (error) {
      console.log(error + " Atualizacao")

    } finally {

    }
  }

  function setListComunidade(municipio: string) {
    for (let comunidade of dropComunidade) {
      if (comunidade['cod'] === municipio) {
        setComunidades(comunidade['comunidades']);
      } else {
      }
    }
  }


  function calcAreaTotal(largura: string) {
    const total = parseFloat(compTelhado) * parseFloat(largura)
    setAreaTotalTelhado(total.toString())
  }

  function removerVirgula(valor: string) {
    return valor.replaceAll(`,`, '.')

  }


  function valida() {

    // if ((municipio === undefined) || (municipio =="") ) {
    //   Alert.alert('O campo Municipio não pode ser vazio');

    // } else if ((comunidade === undefined) || (comunidade =="") ) {
    //   Alert.alert("O campo Comunidade não pode ser vazio");

    // } else if ((nome === undefined) || (nome =="") ) {
    //   Alert.alert("O Campo Nome é Obrigatório !");

    // } else if ((cpf === undefined) || (cpf =="") ) {
    //   Alert.alert("O Campo CPF é Obrigatório !");

    // } else if ((dtNasc === undefined) || (dtNasc =="") ) {
    //   Alert.alert("O Campo Data Nasc. Obrigatório !");

    // } else if ((tel === undefined) || (tel =="") ) {
    //   Alert.alert("O Campo Data Telefone Obrigatório !");

    // } else if ((qtdPessoa === undefined) || (qtdPessoa =="") ) {
    //   Alert.alert("O Campo Quant Pessoas é Obrigatório !");

    // } else */
    if ((renda === undefined) || (renda == "")) {
      Alert.alert("O Campo Renda é Obrigatório !");

      // } else if ((moradia === undefined) || (moradia =="") ) {
      //   Alert.alert("O Campo Moradia é Obrigatório !");

      // } else if ((compTelhado === undefined) || (compTelhado =="") ) {
      //   Alert.alert("O Campo Comprimento Telhado é Obrigatório !");

      // } else if ((larguracompTelhado === undefined) || (larguracompTelhado =="") ) {
      //   Alert.alert("O Campo Largura Comp. Telhado é Obrigatório !");

      // } else if ((areaTotalTelhado === undefined) || (areaTotalTelhado =="") ) {
      //   Alert.alert("O Campo Area Total Telhado é Obrigatório !");

      // } else if ((compTestada === undefined) || (compTestada =="") ) {
      //   Alert.alert("O Campo Comp. Testada é Obrigatório !");

      // } else if ((numCaidaTelhado === undefined) || (numCaidaTelhado =="") ) {
      //   Alert.alert("O Campo Num Caida Telhado é Obrigatório !");

      // } else if ((existeFogaoLenha === undefined) || (existeFogaoLenha =="") ) {
      //   Alert.alert("O Campo Existe Fogao Lenha é Obrigatório !");

      // } else if ((medidaTelhadoAreaFogao === undefined) || (medidaTelhadoAreaFogao =="") ) {
      //   Alert.alert("O Campo Medida Telhado AreaFogao é Obrigatório !");

      // } else if ((testadaDispParteFogao === undefined) || (testadaDispParteFogao =="") ) {
      //   Alert.alert("O Campo Testada Desconsiderando parte Fogão é Obrigatório !");

      // } else if ((atendPipa === undefined) || (atendPipa =="") ) {
      //   Alert.alert("O Campo AtendPipa é Obrigatório !");

      // } else if ((nomeAgente === undefined) || (nomeAgente =="") ) {
      //   Alert.alert("O Campo Nome Agente é Obrigatório !");

      // } else if ((cpfAgente === undefined) || (cpfAgente =="") ) {
      //   Alert.alert("O Campo Cpf Agente é Obrigatório !");

      // } else if ((nomeEng === undefined) || (nomeEng =="") ) {
      //   Alert.alert("O Campo Nome Eng é Obrigatório !");

      // } else if ((creaEng === undefined) || (creaEng == "")) {
      //   Alert.alert("O Campo Crea Eng é Obrigatório !")

    } else {

      if (param_id) {
        atualiza();
      } else {
        create();
      }


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

          <Text style={styles1.label}>Município : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => {
                setMunicipio(value)
                setListComunidade(value)
              }
              }
              value={municipio}
              items={dropMunicipio}
              placeholder={{ label: 'Select o Município..', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Comunidade : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => {
                setComunidade(value)
              }
              }
              value={comunidade}
              items={comunidades}
              placeholder={{ label: 'Select o Comunidade..', value: '' }}
            />
          </View>

          <Text style={styles1.label}>Endereço Completo :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always" onChangeText={setEndereco}
            maxLength={50} value={endereco} />

          <Text style={styles1.label}>Localização :</Text>
          <TextInput style={styles1.inputRo} value={localiza} onChangeText={setLocaliza} />
          <TouchableOpacity
            style={styles1.button}
            onPress={toggleModal}>
            <Text style={styles1.buttonText}>Atualizar Localização</Text>
          </TouchableOpacity>



          <Text style={styles1.title1}>Dados Pessoais</Text>


          <Text style={styles1.label}>Nome Morador : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} keyboardType={'default'} clearButtonMode="always"
            onChangeText={setNome} value={nome} maxLength={40} />

          <Text style={styles1.label}>CPF - do Morador : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            style={styles1.input}
            value={cpf}
            onChangeText={(masked, unmasked) => {
              setCpf(masked); // you can use the unmasked value as well
            }}
            mask={Masks.BRL_CPF}
          />


          <Text style={styles1.label}>Data Nascimento : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            style={styles1.input}
            value={dtNasc}
            onChangeText={(masked, unmasked) => {
              setDtNasc(masked); // you can use the unmasked value as well

            }}
            mask={Masks.DATE_DDMMYYYY}
          />

          {/* Telefone */}
          <Text style={styles1.label}>Telefone : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            style={styles1.input}
            value={tel}
            onChangeText={(masked, unmasked) => {
              setTel(masked); // you can use the unmasked value as well

            }}
            mask={Masks.BRL_PHONE}
          />

          <Text style={styles1.label}>N Cad Único:</Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'default'} clearButtonMode="always"
            onChangeText={setCadUnico} value={cadUnico} maxLength={15} />

          <Text style={styles1.label}>Quantidade de pessoas que residem no imóvel : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'numeric'}
            clearButtonMode="always" onChangeText={setQtdPessoa}
            value={String(qtdPessoa)} maxLength={4} />



          <Text style={styles1.label} >Renda familiar : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            style={styles1.input}
            value={String(renda)}
            onChangeText={(masked, unmasked) => {
              setRenda(masked); // you can use the unmasked value as well
              //console.log(masked)

            }}
            mask={Masks.BRL_CURRENCY}
          />
          <Text style={styles1.label}>Tipo de Moradia <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setMoradia(value), isMoradiaOutroVisivel(value)]}
              value={moradia}
              items={data_moradia}
              placeholder={{ label: 'Tipo de Moradia..', value: '' }}
            />
          </View>

          {moradiaOutrosVisivel && (
            <>
              <Text style={styles1.label}>Outros Descrever :</Text>
              <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
                onChangeText={setOutroMoradia} value={outroMoradia} maxLength={120} />
            </>
          )}
          <Text style={styles1.title1}>Caracterização do imóvel</Text>


          <Text style={styles1.label}>Comprimento Total do Telhado (m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={(value) => { [, setCompTelhado(removerVirgula(value))] }}
            keyboardType={'decimal-pad'}
            value={compTelhado} maxLength={5} />

          <Text style={styles1.label}>Largura do Telhado (m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={(value) => {
              [
                setLarguraCompTelhado(removerVirgula(value)),
                calcAreaTotal(value)]
            }
            }
            keyboardType={'decimal-pad'}
            value={String(larguracompTelhado)} maxLength={5} />


          {/* Area total do Telhado */}
          <Text style={styles1.label}>Área total do telhado (m2) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.inputRo} placeholder="" clearButtonMode="always"
            onChangeText={setAreaTotalTelhado} keyboardType={'decimal-pad'}
            value={String(areaTotalTelhado)} maxLength={5} editable={false} />

          <Text style={styles1.label}>Comprimeto da testada (m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={setCompTestada} keyboardType={'decimal-pad'}
            value={String(compTestada)} maxLength={5} />

          <Text style={styles1.label}>Número de caídas do telhado  : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={setNumCaidaTelhado} keyboardType={'numeric'} maxLength={2}
            value={numCaidaTelhado} />

          <Text style={styles1.label}>Tipo de cobertura do imóvel:</Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setCoberturaTelhado(value), isTpCoberturaOutroVisivel(value)]}
              value={coberturaTelhado}
              items={data_cobertura}
              placeholder={{ label: 'Tipo de Cobertura..', value: '' }}
            />
          </View>

          {tpCoberturaOutVisivel && (
            <>
              <Text style={styles1.label}>Outros Descrever:</Text>
              <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
                onChangeText={setCobertOutros} maxLength={120}
                value={coberturaOutros} />

            </>
          )}


          <Text style={styles1.title1}>Dados Complementares</Text>


          <Text style={styles1.label}>Existe fogão a lenha?  : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setExisteFogaoLenha(value), isExistFogaoVisivel(value)]}
              value={existeFogaoLenha}
              items={[{
                "label": "Não",
                "value": "0"
              },
              {
                "label": "Sim",
                "value": "1"
              }]}
            //placeholder={{ label: 'Selecione uma Opção', value: '' }}
            />
          </View>

          {existFogaoLenhaVisivel && (
          <>
          <Text style={styles1.label}>Medida do telhado desconsiderando a área do fogão à lenha(m2): <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'decimal-pad'}
            clearButtonMode="always" onChangeText={setMedidaTelhadoAreaFogao} maxLength={5}
            value={medidaTelhadoAreaFogao} />

          <Text style={styles1.label}>Testada disponível, desconsiderando a parte do fogão à lenha(m) : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" keyboardType={'decimal-pad'}
            clearButtonMode="always" onChangeText={setTestadaDispParteFogao} maxLength={5}
            value={testadaDispParteFogao} />
          </>
          )}


          <Text style={styles1.label}>Atendimento por caminhão Pipa ?: <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>
            <RNPickerSelect
              onValueChange={(value) => [setSelectedValue(value), setAtendPipa(value), isAtendPipaOutroVisivel(value)]}
              value={atendPipa}
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

          {atendPipaOutroVisivel && (
          <>
          <Text style={styles1.label}>Órgão responsável pelo atendimento com caminhão Pipa : *</Text>
          <View style={{ borderWidth: 1, borderColor: 'silver', borderRadius: 4 }}>

            {/* Item CK Defesa Civil */}
            <View style={styles1.section}>
              <Checkbox style={styles1.checkbox} value={isChRespAtPipaDefesaCivil} onValueChange={setChRespAtPipaDefesaCivil} />
              <Text style={styles1.paragraph}>Defesa Civil</Text>
            </View>
            {/* Item CK Exercito */}
            <View style={styles1.section}>
              <Checkbox style={styles1.checkbox} value={isChRespAtPipaExercito} onValueChange={setChRespAtPipaExercito} />
              <Text style={styles1.paragraph}>Exército</Text>
            </View>

            {/* Item CK Particular */}
            <View style={styles1.section}>
              <Checkbox style={styles1.checkbox} value={isChRespAtPipaParticular} onValueChange={setChRespAtPipaParticular} />
              <Text style={styles1.paragraph}>Particular</Text>
            </View>

            {/* Item CK Prefeitura */}
            <View style={styles1.section}>
              <Checkbox style={styles1.checkbox} value={isChRespAtPipaPrefeitura} onValueChange={setChRespAtPipaPrefeitura} />
              <Text style={styles1.paragraph}>Prefeitura</Text>
            </View>

            {/* Item             } CK Outros */}
            <View style={styles1.section}>
              <Checkbox style={styles1.checkbox} value={isChRespAtPipaOutros} onValueChange={setChRespAtPipaOutros} />
              <Text style={styles1.paragraph}>Outros</Text>
            </View>
          </View>

          <Text style={styles1.label}>Outros Descrever:</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={setOutroAtendPipa} maxLength={120}
            value={outroAtendPipa} />
            </>
            )}

          <Text style={styles1.label}>Identificação dos Agentes :</Text>

          <Text style={styles1.label}>Nome do Agente : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={setNomeAgente} maxLength={50}
            value={nomeAgente}
          />

          <Text style={styles1.label}>CPF do Agente : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <MaskInput
            style={styles1.input}
            value={cpfAgente}
            onChangeText={(masked, unmasked) => {
              setCpfAgente(masked); // you can use the unmasked value as well

            }}
            mask={Masks.BRL_CPF}
          />

          <Text style={styles1.label}>Nome do Engenheiro responsável : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={setNomeEng} maxLength={50}
            value={nomeEng} />

          <Text style={styles1.label}>Crea do Engenheiro responsável : <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20 }}>*</Text></Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            onChangeText={setCreaEng} maxLength={15}
            value={creaEng} />

          <Text style={styles1.label}>Observações :</Text>
          <TextInput style={styles1.input} placeholder="" clearButtonMode="always"
            multiline onChangeText={setOutrObs} maxLength={120}
            value={outrObs} />

          <TouchableOpacity
            style={styles1.button}
            onPress={valida}>
            <Text style={styles1.buttonText}>{funcBotao}</Text>
          </TouchableOpacity>


        </View>

        <StatusBar style="light" />

        {/* Modal renovar Lat Long */}
        <Modal isVisible={isModalVisible}>
          <View style={styles1.modalContent}>
            <Text>Are you sure you want to proceed?</Text>
            <Button title="Confirm" onPress={handleConfirm} />
            <Button title="Cancel" onPress={handleCancel} />
          </View>
        </Modal>


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
    backgroundColor: { background },

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
    paddingLeft: 5,
    backgroundColor: '#ADD8E6',
    borderRadius: 5,
    paddingHorizontal: 0,
    fontSize: 16,
    alignItems: 'stretch',
    // borderBottomWidth: 1.0,
  },
  inputRo: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#A9A9A9',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    alignItems: 'stretch',
    // borderBottomWidth: 1.0,

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
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});

