import { StyleSheet } from "react-native";
// import Colors from "./colors";

const GlobalStyles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  label: { marginTop: 12, marginBottom: 4, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4 },
  results: { marginTop: 24 },
  buttons: { marginTop: 12 },
});

const TextSize = {
  small: 12,
  medium: 16,
  large: 20,
};

export { GlobalStyles, TextSize };
