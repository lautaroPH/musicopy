import { ThumbUpIcon, ChatIcon } from '@heroicons/react/outline';
import Layout from './Layout';
import ModalGenre from './ModalGenre';
import ModalMusic from './ModalMusic';
import AudioMusicPlayer from './AudioMusicPlayer';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Music = ({
  id,
  artist,
  audio,
  genre,
  image,
  imageMusic,
  timestamp,
  title,
}) => {
  const [urlAudio, setUrlAudio] = useState('');

  useEffect(() => {
    axios({
      url: `https://cors-anywhere.herokuapp.com/${audio}`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const audiofile = new Blob([response.data], { type: 'audio/webm' });
      const url = window.URL.createObjectURL(audiofile);
      setUrlAudio(url);
    });
  }, []);
  // const link = document.createElement('a');
  // link.href = url;
  // link.download = `${title}.webm`;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);

  console.log(urlAudio);

  // const [likes, setLikes] = useState([]);

  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, 'musics', id, 'likes'), (snapshot) => {
  //       setLikes(snapshot.docs);
  //     }),
  //   [db]
  // );
  return (
    <Layout
      title={title}
      description={`Cancion creada por ${artist} del genero ${genre} y se llama ${title}`}
    >
      <AudioMusicPlayer
        artist={artist}
        audio={audio}
        image={image}
        timestamp={timestamp}
        title={title}
      />

      {/* <button onClick={download}>Download Image</button> */}
      <a href={urlAudio} download={`${title}.webm`}>
        Descargar
      </a>
      <div className="flex gap-14 sm:ml-16 ml-4 items-center">
        <p className="flex cursor-pointer">
          <ThumbUpIcon className="h-6 inline text-purple-500" />
          <span className="ml-0.5 font-medium text-purple-700">Me gusta</span>
        </p>
        <p className="flex cursor-pointer ">
          <ChatIcon className="h-6 inline text-purple-500" />
          <span className="ml-0.5 font-medium text-purple-700">Comentar</span>
        </p>
      </div>
      <ModalGenre />
      <ModalMusic />
    </Layout>
  );
};

export default Music;
