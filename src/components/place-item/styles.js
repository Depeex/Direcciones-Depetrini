import { StyleSheet } from 'react-native';

import { colors } from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.tertiary,
    borderBottomWidth: 1,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: colors.secondary,
  },
  info: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 14,
    color: colors.text,
  },
  address: {
    fontSize: 12,
    color: colors.text,
    fontWeight: 'bold',
  },
});
