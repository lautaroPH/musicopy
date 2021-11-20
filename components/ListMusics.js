// import {
//   collection,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
//   where,
// } from '@firebase/firestore';
// import { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { db } from '../firebase';
// import MusicList from './MusicList';

// const ListMusics = ({ genero }) => {
//   const [musics, setMusics] = useState([]);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(async () => {
//     const first = query(
//       collection(db, 'musics'),
//       where('genre', '==', genero),
//       orderBy('timestamp', 'desc'),
//       limit(7)
//     );
//     const documentSnapshots = await getDocs(first);
//     setMusics(documentSnapshots.docs);
//   }, [db, genero]);

//   const getMorePost = async () => {
//     const lastVisible = musics[musics.length - 1];

//     const next = query(
//       collection(db, 'musics'),
//       where('genre', '==', genero),
//       orderBy('timestamp', 'desc'),
//       startAfter(lastVisible),
//       limit(7)
//     );

//     const documentSnapshotsNew = await getDocs(next);

//     setMusics((music) => [...music, ...documentSnapshotsNew.docs]);
//   };

//   return (
//     <InfiniteScroll
//       dataLength={musics.length}
//       next={getMorePost}
//       hasMore={hasMore}
//       loader={<h3> Cargando...</h3>}
//       endMessage={<h4>No hay mas para mostrar</h4>}
//     >
//       <div
//         className="grid gap-6 grid-cols-1 sm:grid-cols-2  md:max-w-3xl
//           xl:grid-cols-3 xl:max-w-6xl mx-auto justify-center p-5"
//       >
//         {musics.map((music) => (
//           <div key={music.id}>
//             <MusicList
//               id={music.id}
//               artist={music.data().artist}
//               genre={music.data().genre}
//               image={music.data().image}
//               imageMusic={music.data().imageMusic}
//               timestamp={music.data().timestamp}
//               title={music.data().title}
//             />
//           </div>
//         ))}
//       </div>
//     </InfiniteScroll>
//   );
// };

// export default ListMusics;
