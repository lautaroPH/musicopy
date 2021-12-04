import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { ModalGenreContext } from '../context/ModalGenreContext';
import { ModalMusicContext } from '../context/ModalMusicContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [open, setOpen] = useState(false);
  const [openModalMusic, setOpenModalMusic] = useState(false);

  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}

export default MyApp;
