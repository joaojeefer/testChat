import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
    container: {
      height: 44,
      width: '100%',
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.secondary.default,
    },
    iconArea: {
      marginRight: 15,
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      flexWrap: 'wrap',
      textTransform: 'uppercase',
      color: colors.secondary.light,
    },
});

export default styles;
