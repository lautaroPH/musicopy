import { collection, getDocs, query, where } from '@firebase/firestore';
import { useRouter } from 'next/dist/client/router';
import { db } from '../../firebase';

const MusicPage = (props) => {
  const router = useRouter();

  console.log(props);

  if (router.isFallback) return <h1>Cargando...</h1>;
  return <h1>hola</h1>;
};

export default MusicPage;

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { id } = params;

  console.log(id);

  const music = query(collection(db, 'musics'), where('id', '==', id));

  if (res) {
    res.writeHead(301, { Location: '/' }).end();
  }
  const props = await getDocs(music);
  return { props };
  // .then((doc) => {
  //   const data = doc.data();
  //   const id = doc.id;
  //   const { timestamp } = data;

  //   const props = {
  //     ...data,
  //     id,
  //     timestamp: +timestamp.toDate(),
  //   };
  //   return { props };
  // })
  // .catch(() => {
  //   return { props: {} };
  // });

  // const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  // if (apiResponse.ok) {
  //   const props = await apiResponse.json()
  //   return { props }
  // }
  // if (res) {
  //   res.writeHead(301, { Location: "/home" }).end()
  // }
}
