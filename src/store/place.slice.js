import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { insertPlace, selectPlaces } from '../db';
import Place from '../model/place';
import { extractErrorMessage } from '../utils';
import { URL_GEOCODING } from '../utils/maps';

const initialState = {
  places: [],
  isLoading: false,
};

export const savePlace = createAsyncThunk('place/savePlace', async (place, thunkAPI) => {
  try {
    const response = await fetch(URL_GEOCODING(place.coords.lat, place.coords.lng));
    console.log('response', response);
    if (!response.ok) {
      return thunkAPI.rejectWithValue('Algo ha salido mal!');
    }

    const data = await response.json();
    console.log('data', data);
    if (!data.results) thunkAPI.rejectWithValue('No se ha podido encontrar la dirección del lugar');

    const address = data.results[0].formatted_address;
    const result = await insertPlace(place.title, place.image, address, place.coords);
    const newPlace = new Place(result.insertId, place.title, place.image, address, place.coords);
    return newPlace;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

/**En Redux Toolkit, en lugar de definir acciones y reducers por separado, puedes utilizar la función createSlice. Esta función genera automáticamente las acciones y el reducer basándose en el objeto que le proporcionas. Reduce la cantidad de código repetitivo y te permite definir acciones y reducers en un solo lugar. Entonces, la diferencia principal es que un reducer es una función que especifica cómo se actualiza el estado en general, mientras que una slice es una entidad que combina un estado y un reducer específicos en un solo objeto.

Redux Toolkit simplifica la definición y combinación de reducers al permitir que createSlice genere automáticamente el reducer y las acciones para una slice específica. Esto reduce la cantidad de código repetitivo y mejora la legibilidad y la organización del código. */

export const getPlaces = createAsyncThunk('place/getPlaces', async (_, thunkAPI) => {
  try {
    const result = await selectPlaces();
    return result?.rows?._array;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

const placeSlice = createSlice({
  //Este es el nombre que le damos al reductor
  name: 'place',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(savePlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places.push(action.payload);
      })
      .addCase(savePlace.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPlaces.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = action.payload;
      })
      .addCase(getPlaces.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default placeSlice.reducer;
