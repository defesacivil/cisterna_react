import { Dimensions, StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
    marginHorizontal: 5,
    height: 350,
    width: 172,
    padding: 12,
    borderRadius: 4,
  },
  list: {
    padding: 5,
  },
  listContainer: {
    alignItems: "center",
    gap: 0,
  },
  cardHeader: {
    paddingVertical: 12,
    paddingHorizontal: 2,
    flexDirection: "column",
    justifyContent: "center",
    gap: 0,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
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
    backgroundColor: "silver",
    padding: 24,
    width: "100%",
    height: "70%",
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
    backgroundColor: "blue",
    textAlign: "center",
    paddingHorizontal: 12,
    //paddingVertical: 6,
    borderRadius: 4,
    flexDirection: "row",
  },
  obs: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",

  },
  button1: {
    height: 30,
    width:100,
    backgroundColor: 'blue',
    borderRadius: 5,
    //paddingHorizontal: 24,
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
  
})
