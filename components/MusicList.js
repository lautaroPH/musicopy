const MusicList = ({
  id,
  artist,
  genre,
  image,
  imageMusic,
  timestamp,
  title,
}) => {
  const date = new Date(parseInt(timestamp?.seconds * 1000));
  const normalizedTimestamp = new Intl.DateTimeFormat('es-ES').format(date);
  return (
    <div className="flex shadow-md border-r " key={id}>
      <div className="">
        <img className="p-3 h-36 w-36" src={imageMusic} alt={title} />
      </div>
      <div className="ml-1 mt-2">
        <p className="mb-2">
          <b>Titulo:</b> <span>{title}</span> -{' '}
          <span className="text-sm text-gray-600 font-semibold">{genre}</span>
        </p>

        <p className="inline mb-2">
          <b>Artista:</b> {artist}
        </p>
        <img
          className="inline h-12 w-12 rounded-sm ml-2 mb-2  "
          src={image}
          alt={artist}
        />
        <p>
          <b>Fecha: </b>
          <time>{normalizedTimestamp}</time>
        </p>
      </div>
    </div>
  );
};

export default MusicList;
