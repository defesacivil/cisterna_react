import { useSQLiteContext } from "expo-sqlite"

export type CadatroDB = {

    id: number
    municipio: string
    comunidade: string
    nome: string
    endereco: string
    localiza: string
    cpf: string
    dtNasc: string
    cadUnico: string
    qtdPessoa: number
    renda: number
    moradia: string
    outroMoradia:string
    compTelhado: number
    larguracompTelhado: number
    areaTotalTelhado: number
    compTestada: number
    numCaidaTelhado: number
    coberturaTelhado: number
    coberturaOutros:string
    existeFogaoLenha: string
    medidaTelhadoAreaFogao: number
    testadaDispParteFogao: number
    atendPipa: string
    outroAtendPipa:string
    respAtendPipa: string
    outrObs: string
    nomeAgente: string
    cpfAgente: string
    nomeEng: string
    creaEng: string
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
                respAtendPipa,
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
                $respAtendPipa,
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
                $respAtendPipa: data.respAtendPipa,
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
    async function update(data: CadatroDB) {

        const statement = await database.prepareAsync(
            "UPDATE cadastro SET nome = $nome WHERE id = $id"
        )

        try {
            await statement.executeAsync({
                $id: data.id,
                $nome: data.nome
            })

        } catch (error) {
            throw (error)
        } finally {
            await statement.finalizeAsync()
        }

    }

    return { create, searchByName, update }
}
