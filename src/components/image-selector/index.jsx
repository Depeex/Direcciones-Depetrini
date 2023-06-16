import Ionicons from '@expo/vector-icons/Ionicons';
import { requestCameraPermissionsAsync, launchCameraAsync } from 'expo-image-picker';
import { useState } from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';

import { styles } from './styles';

const ImageSelector = ({ onImage }) => {
  const [pickedUrl, setPickedUrl] = useState(null);

  const verifyPermissions = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos permisos para usar la camara', [{ text: 'Ok' }]);
      return false;
    }
    return true;
  };
  const onHandleTakeImage = async () => {
    const isCameraPermission = await verifyPermissions();
    // eslint-disable-next-line no-useless-return
    if (!isCameraPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    setPickedUrl(image.uri);
    onImage(image.uri);
  };
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUrl ? (
          <Text>No hay imagen seleccionada</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedUrl }} />
        )}
      </View>
      <View style={styles.touchableContainer}>
        <TouchableOpacity onPress={onHandleTakeImage} style={styles.buttonContainer}>
          <Ionicons name="camera-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImageSelector;
