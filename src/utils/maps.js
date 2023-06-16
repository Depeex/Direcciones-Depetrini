export const MAPS_API_KEY = 'AIzaSyB1CrKuzGd2AbqkchNcF_WBYIE3ur6730k';
export const URL_MAPS = (lat, lng, zoom = 14) =>
  `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom =${zoom}&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${MAPS_API_KEY}`;

export const URL_GEOCODING_API = 'AIzaSyBEs5muvDxHf3a5GL2ns_S_pqdJYO_ESWQ';
export const URL_GEOCODING = (lat, lng) =>
  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${URL_GEOCODING_API}`;
