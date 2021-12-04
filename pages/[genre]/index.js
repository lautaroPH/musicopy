import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import ModalGenre from '../../components/ModalGenre';
import ModalMusic from '../../components/ModalMusic';
import MusicList from '../../components/MusicList';
import { db } from '../../firebase/firebase';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../components/Header';
import Head from 'next/dist/shared/lib/head';
import Link from 'next/dist/client/link';

const genreList = () => {
  const [musics, setMusics] = useState([]);
  const [noMusics, setNoMusics] = useState(false);
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);

  const genero = router.query.genre || '';

  useEffect(async () => {
    const first = query(
      collection(db, 'musics'),
      where('genre', '==', genero),
      orderBy('timestamp', 'desc'),
      limit(15)
    );
    const documentSnapshots = await getDocs(first);

    setMusics(documentSnapshots.docs);
    setNoMusics(documentSnapshots.empty);
  }, [db, genero]);

  const getMorePost = async () => {
    setHasNextPage(true);
    if (musics.length !== 0) {
      const lastVisible = musics[musics.length - 1];

      const next = query(
        collection(db, 'musics'),
        where('genre', '==', genero),
        orderBy('timestamp', 'desc'),
        startAfter(lastVisible),
        limit(15)
      );

      const documentSnapshotsNew = await getDocs(next);

      setMusics((music) => [...music, ...documentSnapshotsNew.docs]);
      setHasNextPage(false);
      if (documentSnapshotsNew.docs.length === 0) {
        setHasMore(false);
      }
    }
  };
  return (
    <div className="h-screen">
      <Head>
        <title>{`${genero}- MusiCopy`}</title>
        <meta
          name="description"
          content={`Listado de las canciones del genero musical: ${genero}`}
        />
      </Head>
      <Header />
      <div className="mt-6">
        <h2 className="text-sm sm:text-lg flex justify-center font-bold text-purple-700">
          Categoria: {genero}
        </h2>
        <InfiniteScroll
          dataLength={musics.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={hasNextPage && <h3 className="text-center"> Cargando...</h3>}
          endMessage={
            <h3 className="text-center">No hay mas musicas para mostrar</h3>
          }
        >
          <div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2  md:max-w-3xl
          xl:grid-cols-3 xl:max-w-6xl mx-auto justify-center p-5"
          >
            {musics.length === 0 && !noMusics ? (
              <h3>Cargando...</h3>
            ) : noMusics ? (
              <h3 className="text-red-600">
                Este genero musical no existe o no tiene musica para mostrar
              </h3>
            ) : (
              musics?.map((music) => (
                <Link href={`/music/${music.id}`} key={music.id}>
                  <div className="cursor-pointer transition-all duration-150 ease-out hover:scale-110">
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
                </Link>
              ))
            )}
          </div>
          <ModalGenre />
          <ModalMusic />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default genreList;
