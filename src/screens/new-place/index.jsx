import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { styles } from './styles';
import { ImageSelector, LocationSelector } from '../../components';
import { savePlace } from '../../store/place.slice';
import { colors } from '../../utils/color';
const NewPlace = ({ navigation }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [coords, setCoords] = useState(null);

  const dispatch = useDispatch();
  //const enableButton = text && image && coords;
  const onHandleChangeText = (text) => {
    setText(text);
  };
  const onHandlerSubmit = () => {
    dispatch(savePlace({ title: text, image, coords })).unwrap();
    navigation.navigate('Places');
  };
  const onImage = (imageUri) => {
    setImage(imageUri);
  };

  const onLocation = (location) => {
    setCoords(location);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Nombre nueva ubicación</Text>
        <TextInput
          style={styles.input}
          placeholder="Nuevo Mexico, CDMX 12345"
          onChangeText={onHandleChangeText}
          value={text}
        />
        <ImageSelector onImage={onImage} />
        <LocationSelector onLocation={onLocation} />
        <Button
          //disabled={!enableButton}
          title="Grabar direccion"
          color={colors.tertiary}
          onPress={onHandlerSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default NewPlace;
