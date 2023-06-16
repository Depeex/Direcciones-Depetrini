import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { styles } from './styles';
import { PlaceItem } from '../../components';
import { getPlaces } from '../../store/place.slice';
const PlaceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.places);
  const onHandlerSelect = (id) => {
    navigation.navigate('PlaceDetail', { placeId: id });
  };

  useEffect(() => {
    dispatch(getPlaces());
  }, [dispatch]);

  const renderItem = ({ item }) => <PlaceItem {...item} onSelect={onHandlerSelect} />;
  const keyExtractor = (item) => item.id;
  return (
    <FlatList
      style={styles.container}
      data={places}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

export default PlaceList;
