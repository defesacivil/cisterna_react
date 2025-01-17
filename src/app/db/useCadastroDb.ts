import { useSQLiteContext } from "expo-sqlite"
import { Alert } from "react-native"

export type CadatroDB = {

    id: number
    municipio: string
    comunidade: string
    nome: string
    endereco: string
    localiza: string
    cpf: string
    dtNasc: string
    tel: string
    cadUnico: string
    qtdPessoa: string
    renda: string
    moradia: string
    outroMoradia: string
    compTelhado: string
    larguracompTelhado: string
    areaTotalTelhado: string
    compTestada: string
    numCaidaTelhado: string
    coberturaTelhado: string
    coberturaOutros: string
    existeFogaoLenha: string
    medidaTelhadoAreaFogao: string
    testadaDispParteFogao: string
    atendPipa: string
    outroAtendPipa: string
    respAtDefesaCivil:boolean
    respAtExercito:boolean
    respAtParticular:boolean
    respAtPrefeitura:boolean
    respAtOutros:boolean
    outrObs: string
    nomeAgente: string
    cpfAgente: string
    nomeEng: string
    creaEng: string
}

export type UpdateObs = {

    id: string
    foto: string
    obs: string
}



export function useCadastroDb() {

    const database = useSQLiteContext()

    async function create(data: Omit<CadatroDB, "id">) {

        const statement = await database.prepareAsync(
            `INSERT INTO cadastro (nome, 
                municipio,
                comunidade,
                endereco,
                localiza,
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
                respAtDefesaCivil,
                respAtExercito,
                respAtParticular,
                respAtPrefeitura,
                respAtOutros,
                outrObs,
                nomeAgente,
                cpfAgente,
                nomeEng,
                creaEng) VALUES ($nome, $municipio,
                $comunidade,
                $endereco,
                $localiza,
                $cpf,
                $dtNasc,
                $tel,
                $cadUnico,
                $qtdPessoa,
                $renda,
                $moradia,
                $outroMoradia,
                $compTelhado,
                $larguracompTelhado,
                $areaTotalTelhado,
                $compTestada,
                $numCaidaTelhado,
                $coberturaTelhado,
                $coberturaOutros,
                $existeFogaoLenha,
                $medidaTelhadoAreaFogao,
                $testadaDispParteFogao,
                $atendPipa,
                $outroAtendPipa,
                $respAtDefesaCivil,
                $respAtExercito,
                $respAtParticular,
                $respAtPrefeitura,
                $respAtOutros,
                $outrObs,
                $nomeAgente,
                $cpfAgente,
                $nomeEng,
                $creaEng);
        `)

        try {
            const result = await statement.executeAsync({
                $nome: data.nome,
                $municipio: data.municipio,
                $comunidade: data.comunidade,
                $endereco: data.endereco,
                $localiza: data.localiza,
                $cpf: data.cpf,
                $dtNasc: data.dtNasc,
                $tel: data.tel,
                $cadUnico: data.cadUnico,
                $qtdPessoa: data.qtdPessoa,
                $renda: data.renda,
                $moradia: data.moradia,
                $outroMoradia: data.outroMoradia,
                $compTelhado: data.compTelhado,
                $larguracompTelhado: data.larguracompTelhado,
                $areaTotalTelhado: data.areaTotalTelhado,
                $compTestada: data.compTestada,
                $numCaidaTelhado: data.numCaidaTelhado,
                $coberturaTelhado: data.coberturaTelhado,
                $coberturaOutros: data.coberturaOutros,
                $existeFogaoLenha: data.existeFogaoLenha,
                $medidaTelhadoAreaFogao: data.medidaTelhadoAreaFogao,
                $testadaDispParteFogao: data.testadaDispParteFogao,
                $atendPipa: data.atendPipa,
                $outroAtendPipa: data.outroAtendPipa,
                $respAtDefesaCivil: (!data.respAtDefesaCivil) ? 0 : 1,
                $respAtExercito: (!data.respAtExercito) ? 0 : 1,
                $respAtParticular: (!data.respAtParticular) ? 0 : 1,
                $respAtPrefeitura: (!data.respAtPrefeitura) ? 0 : 1,
                $respAtOutros: (!data.respAtOutros) ? 0 : 1,
                $outrObs: data.outrObs,
                $nomeAgente: data.nomeAgente,
                $cpfAgente: data.cpfAgente,
                $nomeEng: data.nomeEng,
                $creaEng: data.creaEng,
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }

        } catch (error) {
            throw (error)
        }

    }

    async function searchByName(nome: string) {
        try {
            const query = "SELECT * from cadastro WHERE nome like ?"

            const response = await database.getAllAsync<CadatroDB>(query, `%${nome}%`)

            return response

        } catch (error) {

        }

    }

    async function searchById(id: number) {
        try {
            const query = "SELECT * from cadastro WHERE id = ?"

            const response = await database.getFirstAsync<CadatroDB>(query, `${id}`)

            return response;

            //console.log(response);

        } catch (error) {

        }

    }

    async function searchObsImg(id: number) {
        try {
            const query = "SELECT img_frontal, img_lat_direito,"+
                            "img_lat_esquerdo,img_fundo, img_local_ins_p1,"+
                            "img_local_ins_p2,img_op1,img_op2,img_op3,img_op4 "+
                            "from cadastro WHERE id = ?";

            const response = await database.getFirstAsync(query, `${id}`)

            console.log(response)
            if(response) {
                //const arr = Object.entries(response);
                //return arr;
            }
            return response;
            //console.log(response);
        } catch (error) {

        }

    }

    // update
    async function update(data: CadatroDB) {

        //console.log((!data.respAtExercito) ? 0 : 1)
        const statement = await database.prepareAsync(
            `UPDATE cadastro SET nome = $nome ,
                municipio       =  $municipio,
                comunidade      =  $comunidade,
                endereco        =  $endereco,
                localiza        =  $localiza,
                cpf             =  $cpf,
                dtNasc          =  $dtNasc,
                tel             =  $tel,
                cadUnico        =  $cadUnico,
                qtdPessoa       =  $qtdPessoa,
                renda           =  $renda,
                moradia         =  $moradia,
                outroMoradia    =  $outroMoradia,
                compTelhado     =  $compTelhado,
                larguracompTelhado =  $larguracompTelhado,
                areaTotalTelhado =  $areaTotalTelhado,
                compTestada     =  $compTestada,
                numCaidaTelhado =  $numCaidaTelhado,
                coberturaTelhado=  $coberturaTelhado,
                coberturaOutros =  $coberturaOutros,
                existeFogaoLenha=  $existeFogaoLenha,
                medidaTelhadoAreaFogao =  $medidaTelhadoAreaFogao,
                testadaDispParteFogao =  $testadaDispParteFogao,
                atendPipa         =  $atendPipa,
                outroAtendPipa    =  $outroAtendPipa,
                respAtDefesaCivil = $respAtDefesaCivil,
                respAtExercito    = $respAtExercito,
                respAtParticular  = $respAtParticular,
                respAtPrefeitura  = $respAtPrefeitura,
                respAtOutros      = $respAtOutros,
                outrObs           =  $outrObs,
                nomeAgente        =  $nomeAgente,
                cpfAgente         =  $cpfAgente,
                nomeEng           =  $nomeEng,
                creaEng           =  $creaEng
                WHERE id          = $id`
        )

        try {
            
            await statement.executeAsync({
                
                $id: data.id,
                $nome: data.nome,
                $municipio: data.municipio,
                $comunidade: data.comunidade,
                $endereco: data.endereco,
                $localiza: data.localiza,
                $cpf: data.cpf,
                $dtNasc: data.dtNasc,
                $tel: data.tel,
                $cadUnico: data.cadUnico,
                $qtdPessoa: data.qtdPessoa,
                $renda: data.renda,
                $moradia: data.moradia,
                $outroMoradia: data.outroMoradia,
                $compTelhado: data.compTelhado,
                $larguracompTelhado: data.larguracompTelhado,
                $areaTotalTelhado: data.areaTotalTelhado,
                $compTestada: data.compTestada,
                $numCaidaTelhado: data.numCaidaTelhado,
                $coberturaTelhado: data.coberturaTelhado,
                $coberturaOutros: data.coberturaOutros,
                $existeFogaoLenha: data.existeFogaoLenha,
                $medidaTelhadoAreaFogao: data.medidaTelhadoAreaFogao,
                $testadaDispParteFogao: data.testadaDispParteFogao,
                $atendPipa: data.atendPipa,
                $outroAtendPipa: data.outroAtendPipa,
                $respAtDefesaCivil: (!data.respAtDefesaCivil) ? 0 : 1,
                $respAtExercito: (!data.respAtExercito) ? 0 : 1,
                $respAtParticular: (!data.respAtParticular) ? 0 : 1,
                $respAtPrefeitura: (!data.respAtPrefeitura) ? 0 : 1,
                $respAtOutros: (!data.respAtOutros) ? 0 : 1,
                $outrObs: data.outrObs,
                $nomeAgente: data.nomeAgente,
                $cpfAgente: data.cpfAgente,
                $nomeEng: data.nomeEng,
                $creaEng: data.creaEng
            })

            return true;




        } catch (error) {
            throw (error)
        } finally {
            statement.finalizeAsync();
        }

    }

    // update Obs
    async function updateObs(data: UpdateObs) {

        try {
            const statement = await database.execAsync(
                'UPDATE cadastro SET ' + data.foto + ' = "' + data.obs + '" WHERE id = ' + data.id
            )

            Alert.alert("Lançamento realizado !");

        } catch (error) {
            throw (error)
        } finally {
        }

    }



    // update Obs
    async function deletar(id: number) {

        const statement = await database.prepareAsync(
            `DELETE from cadastro WHERE id = $id`
        )

        try {
            await statement.executeAsync({
                $id: id,

            })

            Alert.alert("Cadastro Deletado com Sucesso !");

        } catch (error) {
            throw (error)
        }

    }

    return { create, searchByName, searchById, update, updateObs, deletar, searchObsImg}
}
