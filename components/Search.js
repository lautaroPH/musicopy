import { SearchIcon } from '@heroicons/react/outline';
import algoliasearch from 'algoliasearch/lite';
import { useState } from 'react';
import Link from 'next/link';

const APPLICATION_ID = 'TMUP17YSS0';
const SEARCH_API_KEY = 'b99688277081a0d19f0e4c109ab56e6b';
const ALGOLIA_INDEX = 'pro_musicopy_musics';

const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX);

const Search = () => {
  const [results, setResults] = useState(null);

  const performSearch = async (value) => {
    const { hits } = await index.search(value);

    const results = hits.map((hit) => {
      const { objectID: key, imageMusic, _highlightResult } = hit;
      const {
        title: { value: title },
        artist: { value: artist },
        genre: { value: genre },
      } = _highlightResult;
      return { key, artist, genre, title, imageMusic };
    });

    setResults(results);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    value === '' ? setResults(null) : performSearch(value);
  };

  return (
    <>
      <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-purple-600" />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="bg-gray-50 block w-full pl-10 sm:text-sm border-purple-300
     rounded-md placeholder-purple-600
     focus:ring-purple-800 focus:border-purple-800 "
          onChange={handleChange}
          type="search"
          placeholder="Buscar..."
        />
      </form>
      {results === null ? null : (
        <div className="absolute mt-14 top-0 left-0 border border-gray-100 -ml-4 sm:ml-2 sm:w-11/12 bg-white overflow-hidden rounded-lg shadow-lg z-10">
          <ul className="overflow-y-scroll scrollbar-hide max-h-[24rem] scrollbar-thin scrollbar-thumb-gray-400">
            {results.map((result) => {
              const { key, artist, genre, title, imageMusic } = result;

              return (
                <li key={key}>
                  <Link href={`/music/${key}`}>
                    <a className="hover:bg-blue-300 flex gap-4 p-4">
                      <img src={imageMusic} alt={title} className="w-16 h-16" />
                      <div>
                        <h3>
                          <span className="font-semibold">{title}</span> -{' '}
                          <span className="text-sm text-gray-700">{genre}</span>
                        </h3>
                        <p className="text-sm text-gray-700">Por: {artist}</p>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
