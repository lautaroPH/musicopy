import { useState } from 'react';
import { ModalGenreContext } from '../context/ModalGenreContext';
import { ModalMusicContext } from '../context/ModalMusicContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [open, setOpen] = useState(false);
  const [openModalMusic, setOpenModalMusic] = useState(false);

  return (
    <ModalMusicContext.Provider
      value={{
        openModalMusic,
        setOpenModalMusic,
      }}
    >
      <ModalGenreContext.Provider
        value={{
          open,
          setOpen,
        }}
      >
        <Component {...pageProps} />
      </ModalGenreContext.Provider>
    </ModalMusicContext.Provider>
  );
}

export default MyApp;
