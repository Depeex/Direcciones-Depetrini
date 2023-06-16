class Place {
  constructor(id, title, image, address, coords) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.address = address;
    this.coords = coords;
  }
}

export default Place;
//Una clase en JavaScript es un tipo de estructura que se utiliza para crear objetos.El constructor es un método especial de una clase que se ejecuta automáticamente cuando se crea un nuevo objeto a partir de la clase. En este caso, el constructor de la clase Place asigna los valores de id y title a las propiedades correspondientes del objeto.this dentro del constructor es una forma de referirse al objeto actual que se está creando, lo que permite asignar valores específicos a las propiedades del objeto en el momento de su creación.
