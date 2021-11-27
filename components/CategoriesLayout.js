import { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { PlusCircleIcon } from '@heroicons/react/outline';
import { ModalGenreContext } from '../context/ModalGenreContext';
import { collection, onSnapshot } from '@firebase/firestore';
import Link from 'next/link';
import { db } from '../firebase/firebase';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CategoriesLayout = () => {
  const { setOpen } = useContext(ModalGenreContext);
  const [genres, setGenres] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'styles'), (snapshot) => {
        setGenres(snapshot.docs);
      }),
    [db]
  );

  return (
    <Menu as="div" className="md:inline-block relative  text-left">
      <div>
        <Menu.Button
          className="inline-flex justify-center w-full  py-2
        text-purple-600 font-semibold"
        >
          Categorias
          <ChevronDownIcon
            className="-mr-1 ml-1 mt-1 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="origin-top-right absolute right-0 mt-2 w-56 
        rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {genres.map((genre) => (
              <Menu.Item key={genre.id}>
                {({ active }) => (
                  <Link href={`/${genre.data().title}`}>
                    <a
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm hover:bg-gray-100 text-gray-900'
                      )}
                    >
                      {genre.data().title}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active }) => (
                <span href="#" className="block px-4 py-2 text-sm border-t-2">
                  <PlusCircleIcon
                    onClick={() => setOpen(true)}
                    className="block h-7 w-full navBtn hover:scale-125"
                  />
                </span>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CategoriesLayout;
