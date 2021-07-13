import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary.darker,
  },
  emptyUsersArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyUsersText: {
    fontSize: 24,
    color: colors.secondary.light,
  },
  row: {
    height: 80,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.secondary.default,
  },
  initialsArea: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary.default,
  },
  initialsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary.darker,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    color: colors.secondary.light,
  },
  emailText: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondary.light,
  },
  iconArea: {
    position: 'absolute',
    right: 14,
  },
});

export default styles;
