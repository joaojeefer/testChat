import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 15,
    fontSize: 12,
    backgroundColor: colors.secondary.light,
    borderWidth: 2,
    borderRadius: 8,
    color: colors.secondary.darker,
},
});

export default styles;
