import { createContext, useState } from "react";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState([]);

  return (
    <MyContext.Provider
      value={{ photos, setPhotos, likedPhotos, setLikedPhotos }}
    >
      {children}
    </MyContext.Provider>
  );
};
export default MyProvider;
