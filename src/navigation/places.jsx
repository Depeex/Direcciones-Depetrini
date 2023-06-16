import Ionicons from '@expo/vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { Maps, NewPlace, PlaceDetail, PlaceList } from '../screens/index';
import { colors } from '../utils/color';

const Stack = createNativeStackNavigator();

const PlacesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Place"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? colors.primary : colors.secondary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Places"
        component={PlaceList}
        options={({ navigation }) => ({
          title: 'Direcciones',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('NewPlace')}>
              <Ionicons name="add-circle-outline" size={25} color={colors.white} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={{ title: 'Detalles de la dirección' }}
      />
      <Stack.Screen name="NewPlace" component={NewPlace} options={{ title: 'Nueva dirección' }} />
      <Stack.Screen name="Maps" component={Maps} options={{ title: 'Mapa' }} />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
