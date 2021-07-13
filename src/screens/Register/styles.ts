import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondary.darker,
    },
    scrolledContent: {
      flexGrow: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
        marginBottom: 10,
    },
    errorText: {
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: 1,
      color: colors.danger.default,
      marginBottom: 10,
    },
});

export default styles;
