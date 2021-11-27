import { Menu } from '@headlessui/react';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from '@firebase/firestore';
import Link from 'next/link';
import { db } from '../firebase/firebase';

const Main = () => {
  const [genres, setGenres] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, 'styles'), (snapshot) => {
        setGenres(snapshot.docs);
      }),
    [db]
  );

  return (
    <Menu
      as="div"
      className="grid  gap-4 grid-cols-1 sm:grid-cols-2  md:max-w-3xl
      xl:grid-cols-3 xl:max-w-6xl mx-auto justify-center p-5 "
    >
      {genres.map((genre) => (
        <Link href={`/${genre.data().title}`} key={genre.id}>
          <div className="rounded-md shadow-xl  w-full cursor-pointer transition-all duration-150 ease-out hover:scale-110 ">
            <img
              className="rounded-t-md h-52 w-full"
              src={genre.data().image}
              alt={genre.data().title}
            />
            <div className="w-full">
              <div className="w-full  rounded-2xl">
                <div
                  className={`flex justify-between w-full
                     px-4 py-2 text-xl font-medium text-left 
                    bg-gray-100  hover:bg-gray-200 focus:outline-none 
                     focus-visible:ring focus-visible:ring-gray-500 
                     focus-visible:ring-opacity-75 rounded-b-md`}
                >
                  <Link href={`/${genre.data().title}`}>
                    <a className="cursor-pointer hover:underline ">
                      {genre.data().title}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Menu>
  );
};

export default Main;
