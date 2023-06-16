import { TouchableOpacity, View, Text, Image } from 'react-native';

import { styles } from './styles';

const PlaceItem = ({ id, title, image, address, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(id)} style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceItem;
