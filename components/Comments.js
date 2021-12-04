import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from '@firebase/firestore';
import { db } from '../firebase/firebase';
import Comment from './Comment';
import InfiniteScroll from 'react-infinite-scroll-component';

const Comments = ({ id }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [hasNextPageComments, setHasNextPageComments] = useState(false);
  const [noComments, setNoComments] = useState(false);

  useEffect(async () => {
    const first = query(
      collection(db, 'musics', id, 'comments'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const documentSnapshots = await getDocs(first);

    setComments(documentSnapshots.docs);
    setNoComments(documentSnapshots.empty);
  }, [db, id]);

  const getMoreComments = async () => {
    setHasNextPageComments(true);
    if (comments.length !== 0) {
      const lastVisible = comments[comments.length - 1];

      const next = query(
        collection(db, 'musics', id, 'comments'),
        orderBy('timestamp', 'desc'),
        startAfter(lastVisible),
        limit(10)
      );

      const documentSnapshotsNew = await getDocs(next);

      setComments((comment) => [...comment, ...documentSnapshotsNew.docs]);
      setHasNextPageComments(false);
      if (documentSnapshotsNew.docs.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');

    await addDoc(collection(db, 'musics', id, 'comments'), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      userUid: session.user.uid,
      timestamp: serverTimestamp(),
    });

    const first = query(
      collection(db, 'musics', id, 'comments'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const documentSnapshots = await getDocs(first);

    setComments(documentSnapshots.docs);
    setNoComments(documentSnapshots.empty);
    setHasMore(true);
  };

  return (
    <>
      <h2 className="sm:ml-16 ml-4 mt-10 mb-5 font-medium text-2xl">
        Comentarios
      </h2>

      {session && (
        <>
          <div className="border-2 rounded-xl shadow-sm sm:ml-16 ml-4 items-center sm:w-4/5 p-2 mr-4">
            <img
              src={session?.user?.image}
              alt="foto de perfil"
              className="h-12 rounded-full w-12 inline"
            />
            <p className="ml-3 mb-3 inline text-purple-700">
              {session?.user?.name}
            </p>
            <form className="flex sm:ml-12 items-center">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="border-none flex-1 focus:ring-0 outline-none h-32 resize-none"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                onClick={sendComment}
                className="font-semibold text-white border-2 border-purple-500 bg-purple-500 p-1 w-18 shadow-md
                  rounded-md mt-20 mr-4 transition-colors ease-out duration-300 hover:bg-purple-800
                   hover:border-purple-800"
              >
                Publicar
              </button>
            </form>
          </div>
        </>
      )}
      {comments.length === 0 && !noComments && (
        <h3 className="text-center">Cargando...</h3>
      )}
      <InfiniteScroll
        dataLength={comments.length}
        next={getMoreComments}
        hasMore={hasMore}
        endMessage={
          <h3 className="text-center">No hay mas comentarios para mostrar</h3>
        }
      >
        {comments.length > 0 && (
          <div className="ml-4 sm:ml-16 mt-5">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                musicId={id}
                userImage={comment.data().userImage}
                username={comment.data().username}
                comment={comment.data().comment}
                timestamp={comment?.data()?.timestamp}
              />
            ))}
            {hasNextPageComments && (
              <h3 className="text-center"> Cargando...</h3>
            )}{' '}
          </div>
        )}
      </InfiniteScroll>
      {noComments && (
        <h4 className="sm:ml-16 ml-4 mt-5 text-red-600 font-medium">
          No hay comentarios para mostrar
        </h4>
      )}
    </>
  );
};

export default Comments;
