import { StyleSheet } from "react-native";
import { colors } from "../../../../styles";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  messageArea: {
    width: '80%',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.secondary.darker,
  },
});

export default styles;
