const Answers = ({ id, userImage, username, timestamp, answer }) => {
  const date = new Date(parseInt(timestamp?.seconds * 1000));
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (timestamp) {
    const normalizedTimestamp = new Intl.DateTimeFormat('es-ES').format(date);
  }
  return (
    <div
      key={id}
      className="border-2 sm:ml-16 ml-4 border-gray-300 sm:w-9/12 rounded-xl shadow-md mr-4 space-x-2 mb-5 bg-gray-200 p-2"
    >
      <div className="flex items-center">
        <img
          className="h-7 rounded-full "
          src={userImage}
          alt="image profile"
        />
        <ul>
          <li className="text-sm ml-2 mr-2 font-bold inline-block">
            {username}
          </li>
          <li className="p-1 text-xs font-light border-l-2 pl-2 border-gray-300 inline-block">
            {normalizedTimestamp} {hours}:{minutes}
          </li>
        </ul>
      </div>
      <div className="flex items-end">
        <p className="flex-1 mt-2 pl-7">{answer}</p>
      </div>
    </div>
  );
};

export default Answers;
