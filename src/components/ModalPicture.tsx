import { Product } from "@/app/(tabs)/fotos"
import { styles } from "@/styles/modalFotos"
import { Button, Modal, Text, View } from "react-native"

type ModalPictureProps = {
  isVisible: boolean
  onClose: () => void
  changeImage: () => void
}

export function ModalPicture({
  isVisible,
  onClose,
  changeImage,
}: ModalPictureProps) {
  return (
    <Modal visible={isVisible} style={{ flex: 1 }} transparent>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.title}>Deseja selecionar uma nova foto?</Text>
          <Text style={styles.subtitle}>A foto atual será substituída</Text>
          <View style={styles.buttonWrapper}>
            <Button title="SIM" color={"#f8934a"} onPress={changeImage} />
            <Button title="NÃO" color={"#f8934a"} onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  )
}
