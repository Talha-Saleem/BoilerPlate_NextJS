import { createContext, SetStateAction, useState } from "react";

const AppContext = createContext<{ app: { galleryData: any[]; } }>({
    app: { galleryData: [] as any[]}
});

export function AppProvider({ children }: any) {
    const [galleryData, setGalleryData] = useState([] as any[]);
  
    // const handleGalleryData = (galleryData: SetStateAction<never[]>) => {
    //   setGalleryData(galleryData);
    // }
  
    const contextProps = {
      galleryData: galleryData,
      // handleGalleryData
    };
  
    return (
        <AppContext.Provider value={{ contextProps }}>{children}</AppContext.Provider>

    );
  }