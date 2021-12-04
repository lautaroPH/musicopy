import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import Answers from './Answers';

const Comment = ({ id, userImage, username, comment, timestamp, musicId }) => {
  const date = new Date(parseInt(timestamp?.seconds * 1000));
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const [openAnswer, setOpenAnswer] = useState(false);
  const [commentAnswer, setCommentAnswer] = useState('');
  const [commentsAnswers, setCommentsAnswers] = useState([]);

  const { data: session } = useSession();

  if (timestamp) {
    const normalizedTimestamp = new Intl.DateTimeFormat('es-ES').format(date);
  }

  const handleAnswer = () => {
    openAnswer ? setOpenAnswer(false) : setOpenAnswer(true);
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'musics', musicId, 'comments', id, 'answers'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => {
          setCommentsAnswers(snapshot.docs);
        }
      ),
    [db, musicId, id]
  );

  const sendCommentAnswer = async (e) => {
    e.preventDefault();

    const commentAnswerToSend = commentAnswer;
    setCommentAnswer('');

    await addDoc(collection(db, 'musics', musicId, 'comments', id, 'answers'), {
      comment: commentAnswerToSend,
      username: session.user.name,
      userImage: session.user.image,
      userUid: session.user.uid,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <>
      <div
        key={id}
        className="border-2 border-gray-300 sm:w-10/12 rounded-xl shadow-md mr-4 space-x-2 mb-5 bg-gray-200 p-2"
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
          <p className="flex-1 mt-2 pl-7">{comment}</p>
          <div>
            {commentsAnswers.length > 0 && (
              <button
                onClick={handleAnswer}
                className="text-purple-600 text-sm transition-colors ease-out duration-300 hover:text-purple-800 border-r-2 border-purple-500 pr-2"
              >
                Respuesta {commentsAnswers.length}
              </button>
            )}
            <button
              onClick={handleAnswer}
              className="ml-2 text-purple-600 text-sm transition-colors ease-out duration-300 hover:text-purple-800"
            >
              Responder
            </button>
          </div>
        </div>
      </div>

      {openAnswer && (
        <>
          {commentsAnswers.map((answer) => (
            <Answers
              key={answer.id}
              id={answer.id}
              userImage={answer.data().userImage}
              username={answer.data().username}
              answer={answer.data().comment}
              timestamp={answer.data().timestamp}
            />
          ))}
          {session && (
            <div className="border-2 rounded-xl shadow-sm sm:ml-16 ml-4 items-center sm:w-9/12  p-2 mr-4 mb-10">
              <img
                src={session?.user?.image}
                alt="foto de perfil"
                className="h-10 rounded-full w-10 inline"
              />
              <p className="ml-3 mb-3 inline text-purple-700">
                {session?.user?.name}
              </p>
              <form className="flex sm:ml-12 sm:h-20 items-center">
                <textarea
                  value={commentAnswer}
                  onChange={(e) => setCommentAnswer(e.target.value)}
                  placeholder="Escribe una respuesta al comentario..."
                  className="border-none flex-1 focus:ring-0 outline-none h-32 sm:h-auto resize-none"
                />
                <button
                  type="submit"
                  disabled={!commentAnswer.trim()}
                  onClick={sendCommentAnswer}
                  className="font-semibold text-white border-2 border-purple-500 bg-purple-500 p-1 w-18 shadow-md
                  rounded-md mt-10 mr-4 transition-colors ease-out duration-300 hover:bg-purple-800
                   hover:border-purple-800"
                >
                  Publicar
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Comment;
