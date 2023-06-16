import { Entypo } from '@expo/vector-icons';
import { useLayoutEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import MapPreview from '../../components/map-preview';

const PlaceDetail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { placeId } = route.params;
  const place = useSelector((state) => state.place.places.find((place) => place.id === placeId));

  const handleDeletePlace = () => {
    dispatch(() => null); //
    navigation.goBack();
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        // eslint-disable-next-line no-unused-expressions
        <TouchableOpacity onPress={handleDeletePlace}>
          <Entypo name="trash" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  const parseCoords = JSON.parse(place.coords);

  return (
    <View style={styles.container}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview style={styles.map} location={{ lat: parseCoords.lat, lng: parseCoords.lng }}>
          <Text>Hola</Text>
        </MapPreview>
      </View>
    </View>
  );
};

export default PlaceDetail;
