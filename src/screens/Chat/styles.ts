import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.secondary.darker,
    },
    contentArea: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    messagesArea: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    separator: { marginBottom: 5 },
    inputArea: {
      height: 40,
      width: '100%',
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    input: {
      flex: 1,
      paddingLeft: 15,
      backgroundColor: colors.secondary.light,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      color: colors.secondary.darker,
     },
     buttonArea: {
        height: 40,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary.default,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
     },
     buttonText: {
         fontSize: 14,
         fontWeight: 'bold',
         color: colors.secondary.darker,
     },
  });

  export default styles;
