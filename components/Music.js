import Layout from './Layout';
import ModalGenre from './ModalGenre';
import ModalMusic from './ModalMusic';
import AudioMusicPlayer from './AudioMusicPlayer';
import ButtonMusics from './ButtonMusics';
import Comments from './Comments';
import Header from './Header';
import Head from 'next/dist/shared/lib/head';

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
  return (
    <div className="h-screen">
      <Head>
        <title>{`${title}- MusiCopy`}</title>
        <meta
          name="description"
          content={`Cancion creada por ${artist} del genero ${genre} y se llama ${title}`}
        />
      </Head>
      <Header />
      <AudioMusicPlayer
        artist={artist}
        audio={audio}
        image={imageMusic}
        timestamp={timestamp}
        title={title}
      />
      <ButtonMusics id={id} title={title} />

      <Comments id={id} />

      <ModalGenre />
      <ModalMusic />
    </div>
  );
};

export default Music;
