import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { CameraIcon } from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { ModalGenreContext } from '../context/ModalGenreContext';
import { db, storage } from '../firebase/firebase';
import { useRouter } from 'next/dist/client/router';

const initEvent = {
  title: '',
};

const ModalGenre = () => {
  //   const { data: session } = useSession();
  const router = useRouter();
  const { open, setOpen } = useContext(ModalGenreContext);
  const filePickerRef = useRef(null);
  const titleRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [selectedFile, setselectedFile] = useState(null);
  const [formValues, setFormValues] = useState(initEvent);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const uploadGenre = async () => {
    if (loading) return;

    setloading(true);

    if (titleRef?.current?.value !== '') {
      const docRef = await addDoc(collection(db, 'styles'), {
        title: titleRef.current.value,
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `styles/${docRef.id}/image`);

      await uploadString(imageRef, selectedFile, 'data_url').then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'styles', docRef.id), {
            image: downloadURL,
          });
        }
      );
      router.push('/');
      setOpen(false);
      setloading(false);
      setselectedFile(null);
    } else {
      alert('incerte un titulo porfavor');
    }
  };

  const addImageToGenre = (e) => {
    const file_extension = filePickerRef?.current?.value
      .split('\\')[2]
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
        setselectedFile(readerEvent.target.result);
      };
    } else {
      alert('extension del archivo no valido');
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10  inset-0 overflow-y-auto"
        onClose={setOpen}
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
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={() => {
                      setselectedFile(null);
                      filePickerRef.current.value = null;
                    }}
                    alt="selected image"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full
                      bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
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
                      Sube la imagen
                    </Dialog.Title>

                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addImageToGenre}
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        className="border-none focus:ring-0 w-full text-center"
                        type="text"
                        ref={titleRef}
                        onChange={handleInputChange}
                        name="title"
                        placeholder="Nombre del genero musical"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile || formValues.title === ''}
                    className="inline-flex justify-center w-full rounded-md border 
                      border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base 
                      font-medium text-white hover:bg-blue-700 focus:outline-none 
                      focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300
                      disabled:cursor-not-allowed sm:text-sm disabled:hover:bg-gray-300"
                    onClick={uploadGenre}
                  >
                    {loading ? 'Creandose...' : 'Crear genero musical'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalGenre;
