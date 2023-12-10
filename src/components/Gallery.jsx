// Importamos las funciones y componentes necesarios desde React y otros archivos.
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useEffect } from "react";
import IconHeart from "./IconHeart";

// Definimos el componente Gallery.
const Gallery = () => {
  // Usamos el hook useContext para acceder al contexto definido en MyContext.
  const { photos, setPhotos, likedPhotos, setLikedPhotos } =
    useContext(MyContext);

  // Usamos useEffect para cargar datos desde una API cuando el componente se monta.
  useEffect(() => {
    const consultAPI = async () => {
      // Definimos la URL de la API.
      const url = "/photos.json";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al cargar los datos de la API");
        }

        const result = await response.json();

        // Mapeamos los datos de la API a un nuevo formato y actualizamos el estado de photos.
        const photosArray = result.photos.map((photo) => {
          const object = {
            id: photo.id,
            description: photo.alt,
            image: photo.src.tiny,
            liked: photo.liked,
          };
          return object;
        });
        setPhotos(photosArray);
      } catch (error) {
        console.error("Error al cargar datos desde la API:", error);
        // Aquí puedes agregar lógica adicional para manejar el error, como mostrar un mensaje al usuario.
      }
    };

    // Llamamos a la función para cargar los datos cuando el componente se monta.
    consultAPI();
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez, al montar el componente.

  // Manejador de eventos para hacer clic en el botón de "Me gusta" de una foto.
  const handleLikeClick = (photoId) => {
    // Comprobamos si la foto ya está en la lista de fotos que gustan.
    const updateLikedPhotos = likedPhotos.includes(photoId)
      ? likedPhotos.filter((id) => id !== photoId) // Si ya gusta, la quitamos de la lista.
      : [...likedPhotos, photoId]; // Si no gusta, la agregamos a la lista.
    setLikedPhotos(updateLikedPhotos); // Actualizamos el estado de las fotos que gustan.
  };

  // Renderizamos el componente.
  return (
    <div className="gallery grid-columns-5 p-3">
      {photos.map((photo) => (
        <div key={photo.id} className="photo-container">
          <img
            src={photo.image}
            alt={photo.description}
            className="photo"
            onClick={() => handleLikeClick(photo.id)} // Manejador de clics en la foto.
          />
          <div className="heart-container">
            <IconHeart filled={likedPhotos.includes(photo.id)} />{" "}
            {/* Icono de corazón lleno o vacío según si la foto gusta o no. */}
          </div>
          <p className="description">{photo.description}</p>{" "}
          {/* Descripción de la foto. */}
        </div>
      ))}
    </div>
  );
};

// Exportamos el componente Gallery para que pueda ser utilizado en otros lugares.
export default Gallery;
