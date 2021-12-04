import { useEffect, useState } from 'react';
import {
  ThumbUpIcon,
  ChatIcon,
  DownloadIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ThumbUpIcon as ThumbUpIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { db } from '../firebase/firebase';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from '@firebase/firestore';

const ButtonMusics = ({ id, title }) => {
  const { data: session } = useSession();
  const [urlAudio, setUrlAudio] = useState('');
  const [openLink, setOpenLink] = useState(false);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLink = () => {
    openLink ? setOpenLink(false) : setOpenLink(true);
  };

  const handleCross = () => {
    setOpenLink(false);
  };

  useEffect(async () => {
    const apiResponse = await fetch(
      `https://www.googleapis.com/storage/v1/b/musicopy-48f17.appspot.com/o/musics%2F${id}%2Faudio.mp3`
    );
    const audioLink = await apiResponse.json();
    setUrlAudio(audioLink.mediaLink);
  }, []);

  useEffect(
    () =>
      onSnapshot(collection(db, 'musics', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'musics', id, 'likes', session.user.uid));
    } else {
      await setDoc(doc(db, 'musics', id, 'likes', session.user.uid), {
        username: session.user.name,
      });
    }
  };

  return (
    <>
      <div className="flex gap-8 sm:gap-14 sm:ml-16 ml-4 items-center mb-5">
        <button
          onClick={handleLink}
          className="text-purple-600 transition-colors 
          ease-in duration-300 hover:text-purple-800"
        >
          <DownloadIcon className="h-6 m-auto sm:inline " />
          <span className="ml-0.5 font-medium">Descargar</span>
        </button>
        {session && (
          <>
            <p
              onClick={likePost}
              className=" text-purple-600 transition-colors 
          ease-in duration-300 hover:text-purple-800  cursor-pointer"
            >
              {hasLiked ? (
                <ThumbUpIconFilled className="h-6 m-auto sm:inline " />
              ) : (
                <ThumbUpIcon className="h-6 m-auto sm:inline " />
              )}
              <span className="ml-0.5 font-medium ">
                Me gusta ({likes.length > 0 ? likes.length : 0})
              </span>
            </p>
          </>
        )}
      </div>
      {openLink && (
        <div className="max-w-md md:max-w-2xl">
          <div
            onClick={handleCross}
            className=" flex items-center  justify-end cursor-pointer"
          >
            <XIcon className="h-5" />
          </div>
          <div className="flex m-4 sm:ml-16 -mt-5">
            <div className="hidden md:inline">
              <ul className="mb-2">
                <li>
                  1. Haz click con el boton izquierdo del raton en el boton
                  violeta "Descargar en PC"
                </li>
                <li>
                  2. Haz click con el boton derecho del raton en el boton
                  violeta "Descargar en PC"
                </li>
                <li>3. Seleccionar "Guardar enlace como..."</li>
              </ul>
              <a
                className="bg-purple-700 p-2 cursor-pointer text-white 
              rounded-md shadow-md transition-all duration-300 
              hover:bg-purple-500 "
                href={urlAudio}
                target="_blank"
                download={`${title}.mp3`}
              >
                Descargar en PC
              </a>
            </div>

            <div className="md:hidden">
              <ul className="mb-2">
                <li>1. Manten pulsado el boton "Descargar en movil"</li>
                <li>2. Seleccionar "Descargar vinculo..."</li>
              </ul>
              <a
                className="bg-purple-700 p-2 cursor-pointer text-white 
              rounded-md shadow-md transition-all duration-300 
              hover:bg-purple-500 "
                href={urlAudio}
                target="_blank"
                download={`${title}.mp3`}
              >
                Descargar en movil
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ButtonMusics;
