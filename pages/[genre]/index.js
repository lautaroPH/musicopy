import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ModalGenre from '../../components/ModalGenre';
import ModalMusic from '../../components/ModalMusic';
import MusicList from '../../components/MusicList';
import { db } from '../../firebase';

const genreList = () => {
  const [musics, setMusics] = useState([]);
  const router = useRouter();

  const genero = router.asPath.split('/')[1];

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'musics'),
          where('genre', '==', genero),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setMusics(snapshot.docs);
        }
      ),
    [db, genero]
  );

  return (
    <Layout
      title={genero}
      description={`Listado de las canciones del genero musical: ${genero}`}
    >
      <div className="mt-6">
        <h2 className="text-sm sm:text-lg flex justify-center font-bold text-purple-700">
          Categoria: {genero}
        </h2>
      </div>
      <div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2  md:max-w-3xl
            xl:grid-cols-3 xl:max-w-6xl mx-auto justify-center p-5"
      >
        {musics.length === 0 ? (
          <h2>Cargando...</h2>
        ) : (
          musics.map((music) => (
            <div key={music.id}>
              <MusicList
                id={music.id}
                artist={music.data().artist}
                genre={music.data().genre}
                image={music.data().image}
                imageMusic={music.data().imageMusic}
                timestamp={music.data().timestamp}
                title={music.data().title}
              />
            </div>
          ))
        )}
      </div>
      <ModalGenre />
      <ModalMusic />
    </Layout>
  );
};

export default genreList;
