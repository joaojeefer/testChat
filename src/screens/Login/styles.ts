import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.secondary.darker,
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
    linkArea: {
        marginTop: 15,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: colors.secondary.light,
    }
});

export default styles;
