import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { CameraIcon, MicrophoneIcon, XIcon } from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { db, storage } from '../firebase';
// import { useSession } from 'next-auth/react';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { ModalMusicContext } from '../context/ModalMusicContext';
import { AudioPlayer } from './AudioPlayer';

const initEvent = {
  title: '',
  artist: '',
  genre: '',
};

const ModalMusic = () => {
  //   const { data: session } = useSession();
  const { openModalMusic, setOpenModalMusic } = useContext(ModalMusicContext);
  const filePickerRef = useRef(null);
  const filePickerRefArtist = useRef(null);
  const filePickerRefMusic = useRef(null);
  const titleRef = useRef(null);
  const artistRef = useRef(null);
  const genreRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [selectedFile, setselectedFile] = useState(null);
  const [selectedFileArtist, setselectedFileArtist] = useState(null);
  const [selectedFileMusic, setselectedFileMusic] = useState(null);
  const [formValues, setFormValues] = useState(initEvent);
  const [genres, setGenres] = useState([]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(
    () =>
      onSnapshot(collection(db, 'styles'), (snapshot) => {
        setGenres(snapshot.docs);
      }),
    [db]
  );

  const uploadGenre = async () => {
    if (loading) return;

    setloading(true);

    if (
      titleRef?.current?.value !== '' &&
      artistRef?.current?.value !== '' &&
      genreRef?.current?.value !== ''
    ) {
      const docRef = await addDoc(collection(db, 'musics'), {
        title: titleRef?.current?.value,
        artist: artistRef?.current?.value,
        genre: genreRef?.current?.value,
        timestamp: serverTimestamp(),
      });

      const audioRef = ref(storage, `musics/${docRef.id}/audio`);

      await uploadString(audioRef, selectedFile, 'data_url').then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(audioRef);
          await updateDoc(doc(db, 'musics', docRef.id), {
            audio: downloadURL,
          });
        }
      );

      const imageRefArtist = ref(storage, `musics/${docRef.id}/image`);

      await uploadString(imageRefArtist, selectedFileArtist, 'data_url').then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRefArtist);
          await updateDoc(doc(db, 'musics', docRef.id), {
            image: downloadURL,
          });
        }
      );

      const imageRefMusic = ref(storage, `musics/${docRef.id}/imageMusic`);

      await uploadString(imageRefMusic, selectedFileMusic, 'data_url').then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRefMusic);
          await updateDoc(doc(db, 'musics', docRef.id), {
            imageMusic: downloadURL,
          });
        }
      );

      setOpenModalMusic(false);
      setloading(false);
      setselectedFile(null);
      setselectedFileArtist(null);
      setselectedFileMusic(null);
    } else {
      alert('Complete todos los datos porfavor');
    }
  };

  const addAudioToMusic = (e) => {
    const file_extension = filePickerRef?.current?.value
      .split('\\')[2]
      .split('.')[1];
    if (
      file_extension === 'mp3' ||
      file_extension === 'mp4' ||
      file_extension === 'm4a' ||
      file_extension === 'wav' ||
      file_extension === 'wma'
    ) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setselectedFile(readerEvent.target.result);
      };
    } else {
      alert('extension del archivo no valido');
    }
  };

  const addImageToArtist = (e) => {
    const file_extension = filePickerRefArtist?.current?.value
      ?.split('\\')[2]
      .split('.')[1];
    if (
      file_extension === 'png' ||
      file_extension === 'jpg' ||
      file_extension === 'jpge' ||
      file_extension === 'gif' ||
      file_extension === 'webp'
    ) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setselectedFileArtist(readerEvent.target.result);
      };
    } else {
      alert('extension del archivo no valido');
    }
  };

  const addImageToMusic = (e) => {
    const file_extension = filePickerRefMusic?.current?.value
      ?.split('\\')[2]
      .split('.')[1];
    if (
      file_extension === 'png' ||
      file_extension === 'jpg' ||
      file_extension === 'jpge' ||
      file_extension === 'gif' ||
      file_extension === 'webp'
    ) {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.onload = (readerEvent) => {
        setselectedFileMusic(readerEvent.target.result);
      };
    } else {
      alert('extension del archivo no valido');
    }
  };

  return (
    <Transition.Root show={openModalMusic} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10  inset-0 overflow-y-auto"
        onClose={setOpenModalMusic}
      >
        <div
          className="flex items-end justify-center min-h-[800px] 
          sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-200"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className="fixed inset-0 bg-gray-500 
            bg-opacity-75 transition-opacity"
            />
          </Transition.Child>
          <span
            className="hidden sm:inline-block 
            sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-200 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg 
              px-4 pt-5 pb-4  text-left overflow-hidden shadow-xl transform 
              transition-all  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div>
                {selectedFile ? (
                  <div className="flex items-center">
                    <AudioPlayer audioMusic={selectedFile} />
                    <XIcon
                      onClick={() => {
                        setselectedFile(null);
                        filePickerRef.current.value = null;
                      }}
                      className="h-10  cursor-pointer"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => filePickerRef?.current?.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full
                      bg-red-100 cursor-pointer"
                  >
                    <MicrophoneIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {!selectedFile && <span>Sube la musica</span>}
                    </Dialog.Title>

                    {selectedFileMusic ? (
                      <img
                        src={selectedFileMusic}
                        className="w-full h-44 object-contain cursor-pointer"
                        onClick={() => {
                          setselectedFileMusic(null);
                          filePickerRefMusic.current.value = null;
                        }}
                        alt="selected image"
                      />
                    ) : (
                      <div
                        onClick={() => filePickerRefMusic.current.click()}
                        className="mx-auto mt-5 flex items-center justify-center h-12 w-12 rounded-full
                      bg-red-100 cursor-pointer"
                      >
                        <CameraIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <Dialog.Title
                      as="h3"
                      className="text-lg mt-3 leading-6 font-medium text-gray-900"
                    >
                      {!selectedFileMusic && (
                        <span>Sube la imagen de la cancion</span>
                      )}
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRefMusic}
                        type="file"
                        hidden
                        onChange={addImageToMusic}
                      />
                    </div>
                    <div />

                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addAudioToMusic}
                      />
                    </div>

                    <div className="mt-2 border-t-2 border-b-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        ref={titleRef}
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Titulo de la cancion"
                      />
                    </div>

                    <div className="mt-2 border-b-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        ref={artistRef}
                        onChange={handleInputChange}
                        name="artist"
                        placeholder="Artista de la cancion"
                      />
                    </div>

                    <div className="mt-3">
                      {selectedFileArtist ? (
                        <img
                          src={selectedFileArtist}
                          className="w-full h-32 object-contain cursor-pointer"
                          onClick={() => {
                            setselectedFileArtist(null);
                            filePickerRefArtist.current.value = null;
                          }}
                          alt="selected image"
                        />
                      ) : (
                        <div
                          onClick={() => filePickerRefArtist.current.click()}
                          className="mx-auto flex items-center justify-center h-12 w-12 rounded-full
                      bg-red-100 cursor-pointer"
                        >
                          <CameraIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <Dialog.Title
                        as="h3"
                        className="text-lg mt-3 leading-6 font-medium text-gray-900"
                      >
                        {!selectedFileArtist && (
                          <span>Sube la imagen del artista</span>
                        )}
                      </Dialog.Title>

                      <div>
                        <input
                          ref={filePickerRefArtist}
                          type="file"
                          hidden
                          onChange={addImageToArtist}
                        />
                      </div>
                      <div />

                      <div className="mt-2 border-t-2 border-b-2">
                        <select
                          name="genre"
                          className="border-none p-3 focus:ring-0 w-full text-center"
                          ref={genreRef}
                          onChange={handleInputChange}
                        >
                          {genres.map((genre) => (
                            <option key={genre.id}>{genre.data().title}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      disabled={
                        !selectedFile ||
                        !selectedFileArtist ||
                        !selectedFileMusic ||
                        formValues.title === '' ||
                        formValues.artist === '' ||
                        formValues.genre === ''
                      }
                      className="inline-flex justify-center w-full rounded-md border 
                      border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base 
                      font-medium text-white hover:bg-blue-700 focus:outline-none 
                      focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300
                      disabled:cursor-not-allowed sm:text-sm disabled:hover:bg-gray-300"
                      onClick={uploadGenre}
                    >
                      {loading ? 'Creandose...' : 'Crear musica'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalMusic;
