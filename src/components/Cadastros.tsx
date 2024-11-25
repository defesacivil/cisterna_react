import { Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    data: {
        id: number
        nome: string

    }

}

export function Cadastro({ data, ...rest }: Props) {

    return (

        <Pressable
            style={{ backgroundColor: "#CECECE", padding: 24, borderRadius: 5, gap: 12, flexDirection: "row" }}
            {...rest}
        >
            <Text>
                {data.id} - {data.nome}
            </Text>
        </Pressable>
    )
}