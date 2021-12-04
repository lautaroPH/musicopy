import {
  SearchIcon,
  PlusCircleIcon,
  MenuIcon,
  LogoutIcon,
  LoginIcon,
} from '@heroicons/react/outline';
import { HomeIcon, MusicNoteIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { ModalMusicContext } from '../context/ModalMusicContext';
import CategoriesLayout from './CategoriesLayout';
import Link from 'next/dist/client/link';
import { signOut, useSession } from 'next-auth/react';
import Search from './Search';

const Header = ({ fixed }) => {
  const { data: session } = useSession();
  const { setOpenModalMusic } = useContext(ModalMusicContext);
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 shadow-sm border-b bg-white top-0 z-50 mb-3">
        <div className="container mx-auto lg:flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex items-center cursor-pointer transition-all duration-150 ease-out hover:scale-125 space-x-7">
              <MusicNoteIcon className="inline h-6 text-purple-700" />
              <h1 className="musicopy text-xl font-bold text-purple-700">
                <Link href="/">MusiCopy</Link>
              </h1>
            </div>
            <div className="relative mt-1 p-3 rounded-md lg:hidden ">
              <Search />
            </div>
            <button
              className="lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <MenuIcon className="h-8 text-purple-600 lg:hidden cursor-pointer transition-all duration-150 ease-out hover:scale-125" />
            </button>
          </div>

          <div className="relative mt-1 p-3 rounded-md hidden lg:inline">
            <Search />
          </div>

          <div
            className={
              'lg:flex justify-end   items-center' +
              (navbarOpen ? ' flex justify-items-end ' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:items-center  mr-3 lg:flex-row list-none lg:ml-auto ">
              <li
                className="nav-item lg:mr-5"
                onClick={() => setNavbarOpen(false)}
              >
                <CategoriesLayout />
              </li>
              <Link href="/">
                <li className="nav-item lg:mr-5 mb-2">
                  <HomeIcon className="navBtn text-purple-600 md:inline-flex hover:scale-125" />
                </li>
              </Link>
              {session && (
                <li className="nav-item lg:mr-5 mb-2">
                  <PlusCircleIcon
                    onClick={() => {
                      setOpenModalMusic(true);
                      setNavbarOpen(false);
                      // router.replace('/');
                    }}
                    className="navBtn text-purple-600 md:inline-flex hover:scale-125"
                  ></PlusCircleIcon>
                </li>
              )}
              <li className="nav-item lg:mr-4">
                {session ? (
                  <>
                    <LogoutIcon
                      onClick={signOut}
                      className="lg:hidden navBtn h-7 mr-2 mb-1 text-purple-600 hover:scale-125"
                    />
                    <button
                      onClick={signOut}
                      className="hidden lg:inline-flex text-purple-600 font-semibold text-sm md:text-lg mr-2 "
                    >
                      Cerrar sesion
                    </button>{' '}
                    <span className="md:inline-flex text-purple-600 font-semibold text-sm md:text-lg">
                      {session?.user?.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <button className=" text-purple-600 font-semibold text-sm md:text-lg ">
                        <LoginIcon className="lg:hidden navBtn h-7 mr-2 mb-1 text-purple-600 hover:scale-125" />
                        <span className="hidden lg:inline-flex">
                          Iniciar sesion
                        </span>
                      </button>
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
