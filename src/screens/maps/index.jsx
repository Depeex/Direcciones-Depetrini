import { Ionicons } from '@expo/vector-icons';
import { useState, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { styles } from './styles';

const Maps = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { coords } = route.params;
  const initialRegion = {
    latitude: coords?.lat,
    longitude: coords?.lng,
    latitudeDelta: 0.0421,
    longitudeDelta: 0.922,
  };

  const onHandlerPickLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };
  const onHandlerSaveLocation = () => {
    if (selectedLocation) {
      navigation.navigate('NewPlace', {
        mapLocation: selectedLocation,
      });
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // eslint-disable-next-line no-unused-expressions
        <TouchableOpacity disabled={!selectedLocation} onPress={onHandlerSaveLocation}>
          <Ionicons name="save" size={24} color={!selectedLocation ? 'lightgray' : 'white'} />
        </TouchableOpacity>
      ),
    });
  });
  return (
    <MapView
      style={styles.container}
      initialRegion={initialRegion}
      onPress={onHandlerPickLocation}
      minZoomLevel={14}>
      {selectedLocation ? (
        <Marker
          title="Ubicacion seleccionada"
          coordinate={{
            latitude: selectedLocation?.lat,
            longitude: selectedLocation?.lng,
          }}
        />
      ) : null}
    </MapView>
  );
};

export default Maps;
