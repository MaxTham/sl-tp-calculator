import { StyleSheet } from "react-native";
// import Colors from "./colors";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.primary,
    paddingVertical:30,
    paddingHorizontal: 16,
  },
  centered: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:'auto',
    marginBottom: 'auto',
  },
  button_text:{
    paddingVertical:10,
    color: "#ffffff",
  }

});

const TextSize={
  small: 12,
  medium: 16,
  large: 20,
}

export {GlobalStyles, TextSize};
