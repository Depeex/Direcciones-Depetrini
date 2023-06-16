import { useNavigation, useRoute } from '@react-navigation/native';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { View, Alert, Text, Button } from 'react-native';

import { styles } from './styles';
import MapPreview from '../../components/map-preview';
import { colors } from '../../utils/color';

const LocationSelector = ({ onLocation }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState(null);
  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso Denegado', 'Necesitamos permisos para usar la ubicación', [
        { text: 'Ok' },
      ]);
      return false;
    }
    return true;
  };

  const onHandlerGetLocation = async (isMaps = false) => {
    const isLocationAvailable = await verifyPermissions();

    if (!isLocationAvailable) return;
    const location = await getCurrentPositionAsync({
      timeout: 5000,
    });

    const { latitude, longitude } = location.coords;

    setPickedLocation({ lat: latitude, lng: longitude });
    onLocation({ lat: latitude, lng: longitude });
    if (isMaps) {
      navigation.navigate('Maps', { coords: { lat: latitude, lng: longitude } });
    }
  };

  const { mapLocation } = route.params || {};
  useEffect(() => {
    if (mapLocation) {
      setPickedLocation(mapLocation);
      onLocation(mapLocation);
    }
  }, [mapLocation]);
  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.Preview}>
        <Text>No hay ubicacion seleccionada</Text>
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title="Obtener ubicacion"
          color={colors.tertiary}
          onPress={() => onHandlerGetLocation()}
        />
      </View>
      <View style={styles.actions}>
        <Button
          //disabled={!enableButton}
          title="Seleccionar ubicación"
          color={colors.tertiary}
          onPress={() => onHandlerGetLocation(true)}
        />
      </View>
    </View>
  );
};
export default LocationSelector;
