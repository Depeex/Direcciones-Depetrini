import { StyleSheet } from 'react-native';

import { colors } from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 15,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
  touchableContainer: {
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: '20%',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
});
