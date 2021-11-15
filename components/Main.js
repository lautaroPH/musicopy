import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronUpIcon, PauseIcon, PlayIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const MUSICS = [
  {
    id: 1,
    title: 'Rock',
    img: 'https://www.marsicalive.it/wp-content/uploads/2019/09/musica-rock.jpg',
  },
  {
    id: 2,
    title: 'Rock',
    img: 'https://www.marsicalive.it/wp-content/uploads/2019/09/musica-rock.jpg',
  },
  {
    id: 3,
    title: 'Rock',
    img: 'https://www.marsicalive.it/wp-content/uploads/2019/09/musica-rock.jpg',
  },
  {
    id: 4,
    title: 'Rock',
    img: 'https://www.marsicalive.it/wp-content/uploads/2019/09/musica-rock.jpg',
  },
  {
    id: 5,
    title: 'electronica',
    img: 'https://www.marsicalive.it/wp-content/uploads/2019/09/musica-rock.jpg',
  },
  {
    id: 6,
    title: 'pop',
    img: 'https://www.marsicalive.it/wp-content/uploads/2019/09/musica-rock.jpg',
  },
];

const MUSICS_ARTISTS = [
  {
    id: '1',
    title: 'cnacion de musica re pila',
    genero: 'Rock',
  },
  {
    id: '2',
    title: 'cnacion de musica re pila',
    genero: 'pop',
  },
  {
    id: '3',
    title: 'cnacion de popoo re pila',
    genero: 'pop',
  },
  {
    id: '4',
    title: 'cnacion de musica rpclsacs pila',
    genero: 'Rock',
  },
];

const Main = () => {
  const [play, setPlay] = useState(false);
  const [musicId, setmusicId] = useState('');

  const handlePlay = (id) => {
    setmusicId(id);
    setPlay(true);
  };

  const handlePause = (id) => {
    setmusicId(id);
    setPlay(false);
  };

  return (
    <Menu
      as="div"
      className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:max-w-3xl
      xl:grid-cols-3 xl:max-w-6xl mx-auto justify-center p-5 "
    >
      {MUSICS.map((music) => (
        <div className="rounded-md  w-full " key={music.id}>
          <img
            className="rounded-t-md h-52 w-full"
            src={music.img}
            alt={music.title}
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
                      !open && `rounded-lg `
                    }  hover:bg-gray-200 focus:outline-none 
                     focus-visible:ring focus-visible:ring-gray-500 
                     focus-visible:ring-opacity-75`}
                    >
                      <a className="cursor-pointer">{music.title}</a>
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
                          {MUSICS_ARTISTS.map(
                            (music_artits) =>
                              music_artits.genero === music.title && (
                                <Menu.Item key={music_artits.id}>
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
                                        {music_artits.title}
                                      </p>
                                      <p>
                                        {(play && musicId === '') ||
                                        musicId === music_artits.id ? (
                                          <PlayIcon
                                            onClick={handlePause}
                                            className="inline cursor-pointer  mr-5  h-8 w-7"
                                          />
                                        ) : (
                                          <PauseIcon
                                            onClick={() =>
                                              handlePlay(music_artits.id)
                                            }
                                            className="inline cursor-pointer  mr-5  h-8 w-7"
                                          />
                                        )}
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
