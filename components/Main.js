import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ChevronUpIcon,
  MinusIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from '@firebase/firestore';
import { db } from '../firebase';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Main = () => {
  const [genres, setGenres] = useState([]);
  const [musics, setMusics] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'styles'), (snapshot) => {
        setGenres(snapshot.docs);
      }),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, 'musics'), (snapshot) => {
        setMusics(snapshot.docs);
      }),
    [db]
  );

  return (
    <Menu
      as="div"
      className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:max-w-3xl
      xl:grid-cols-3 xl:max-w-6xl mx-auto justify-center p-5 "
    >
      {genres.map((genre) => (
        <div className="rounded-md  w-full " key={genre.id}>
          <img
            className="rounded-t-md h-52 w-full"
            src={genre.data().image}
            alt={genre.data().title}
          />
          <div className="w-full">
            <div className="w-full max-w-md rounded-2xl">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex justify-between w-full
                     px-4 py-2 text-xl font-medium text-left 
                    bg-gray-100 ${
                      !open && `rounded-b-lg `
                    }  hover:bg-gray-200 focus:outline-none 
                     focus-visible:ring focus-visible:ring-gray-500 
                     focus-visible:ring-opacity-75`}
                    >
                      <a className="cursor-pointer">{genre.data().title}</a>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-7 h-8 text-black`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition ease-in-out duration-500 transform opacity-0"
                      enterFrom="-translate-y-full "
                      enterTo="translate-y-0 opacity-100"
                      leave="transition ease-in-out duration-500 transform opacity-0"
                      leaveFrom="translate-y-0"
                      leaveTo="-translate-y-full"
                    >
                      <Disclosure.Panel className="rounded-b-lg bg-gray-100 text-gray-800">
                        <Menu.Items className="rounded-b-lg">
                          {musics.map(
                            (music) =>
                              music.data().genre === genre.data().title && (
                                <Menu.Item key={music.id}>
                                  {({ active }) => (
                                    <div className="flex  justify-between items-center border-b-2">
                                      <p
                                        className={classNames(
                                          active
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700',
                                          'block px-4 py-2 text-sm '
                                        )}
                                      >
                                        <span className="font-bold">
                                          {music.data().title}
                                        </span>
                                        <MinusIcon className="h-4 inline mr-1 ml-1" />
                                        <span className="font-semibold">
                                          {music.data().artist}
                                        </span>
                                      </p>
                                    </div>
                                  )}
                                </Menu.Item>
                              )
                          )}
                        </Menu.Items>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      ))}
    </Menu>
  );
};

export default Main;
