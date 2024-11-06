import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000088",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#d62",
    width: "80%",
    height: "30%",
    borderRadius: 6,
    padding: 24,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#Fefefe",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#fefefe",
  },
  buttonWrapper: {
    flexDirection: "column",
    gap: 16,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 12,
  },
})
