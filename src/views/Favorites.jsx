// Importamos las funciones y componentes necesarios desde React y otros archivos.
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import IconHeart from "../components/IconHeart";

// Definimos el componente Favorites.
const Favorites = () => {
  // Usamos el hook useContext para acceder al contexto definido en MyContext.
  const { photos, likedPhotos, setLikedPhotos } = useContext(MyContext);

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
    <div>
      <h1>Fotos favoritas</h1>
      <div className="p-3 gallery grid-columns-5">
        {likedPhotos.map((photoId) => {
          // Buscamos la foto favorita en la lista de fotos usando su ID.
          const favoritePhoto = photos.find((photo) => photo.id === photoId);

          if (favoritePhoto) {
            return (
              <div key={favoritePhoto.id} className="photo-container">
                <img
                  src={favoritePhoto.image}
                  alt={favoritePhoto.description}
                  className="photo"
                  onClick={() => handleLikeClick(favoritePhoto.id)} // Manejador de clics en la foto.
                />
                <div className="heart-container">
                  <IconHeart filled={true} />{" "}
                  {/* El corazón siempre está lleno para fotos favoritas */}
                </div>
                <p className="description">{favoritePhoto.description}</p>{" "}
                {/* Descripción de la foto. */}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

// Exportamos el componente Favorites para que pueda ser utilizado en otros lugares.
export default Favorites;
