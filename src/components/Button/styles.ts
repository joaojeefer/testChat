import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.default,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.secondary.darker,
  },
});

export default styles;
