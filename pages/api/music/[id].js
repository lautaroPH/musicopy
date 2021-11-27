import { firestore } from '../../../firebase/admin';

export default (request, response) => {
  const { query } = request;
  const { id } = query;

  firestore
    .collection('musics')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      const id = doc.id;
      if (data !== undefined) {
        response.json({
          ...data,
          id,
        });
      } else {
        response.status(404).end();
      }
    });
};
