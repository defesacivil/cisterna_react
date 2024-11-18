import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    marginHorizontal: 5,
    height: 248,
    width: 172,
    padding: 12,
    borderRadius: 4,
  },
  list: {
    padding: 24,
  },
  listContainer: {
    alignItems: "center",
    gap: 24,
  },
  cardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0a7ea4",
    textAlign: "center",
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    height: 36,
    width: 36,
  },

  image: {
    height: 128,
    width: 128,
  },
  containerModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 36,
  },
  modalButton: {
    backgroundColor: "#edab28",
    padding: 24,
    width: "100%",
    borderRadius: 4,
  },
  wrapperButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#fcc61f",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
})
