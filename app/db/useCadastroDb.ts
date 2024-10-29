import { useSQLiteContext } from "expo-sqlite"

export type CadatroDB = {

    nome: string
}

export function useCadastroDb() {

    const database = useSQLiteContext()

    async function create(data: Omit<CadatroDB, "id">) {

        const statement = await database.prepareAsync(
            "INSERT INTO cadastro (nome) VALUES ($name)"
        )

        try {
            const result = await statement.executeAsync({
                $name: data.nome
            })

            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return { insertedRowId }

        } catch (error) {
            throw (error)
        }

    }

    return { create }
}
