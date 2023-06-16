import { configureStore } from '@reduxjs/toolkit';
// Al importar sin llaves, puedes asignar cualquier nombre a ese elemento importado.Por otro lado, cuando utilizas import con llaves, estás realizando una importación de desestructuración (named import). Esto significa que el archivo de origen exporta múltiples elementos, y tú especificas cuáles elementos quieres importar utilizando sus nombres originales.

import placeReducer from './place.slice';

export const store = configureStore({
  reducer: {
    //aca nos encontramos
    place: placeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
