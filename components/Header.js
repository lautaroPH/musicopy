import {
  SearchIcon,
  PlusCircleIcon,
  MenuIcon,
  //   MusicNoteIcon,
} from '@heroicons/react/outline';
import { HomeIcon, MusicNoteIcon } from '@heroicons/react/solid';
import CategoriesLayout from './CategoriesLayout';

const Header = () => {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        <div
          //   onClick={() => router.push('/')}
          className="flex items-center cursor-pointer transition-all duration-150 ease-out hover:scale-125 space-x-7"
        >
          <MusicNoteIcon className="inline h-6 text-purple-700" />
          <h1 className="musicopy text-xl font-bold text-purple-700">
            MusiCopy
          </h1>
        </div>
        <div
          //   onClick={() => router.push('/')}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        ></div>
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-purple-600" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-purple-300
             rounded-md placeholder-purple-600
             focus:ring-purple-800 focus:border-purple-800 "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <CategoriesLayout />
          <HomeIcon
            // onClick={() => router.push('/')}
            className="navBtn text-purple-600 md:inline-flex hover:scale-125"
          />
          <MenuIcon className="h-6 text-purple-600 md:hidden cursor-pointer" />
          <PlusCircleIcon
            //   onClick={() => setOpen(true)}
            className="navBtn text-purple-600 md:inline-flex hover:scale-125"
          />

          <button className="hidden md:inline-flex text-purple-600 font-semibold text-sm md:text-lg ">
            Iniciar sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
