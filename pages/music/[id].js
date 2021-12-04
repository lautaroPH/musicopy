import { useRouter } from 'next/dist/client/router';
import Music from '../../components/Music';

const MusicPage = (props) => {
  const router = useRouter();

  if (router.isFallback) return <h1>Cargando...</h1>;
  return <Music {...props} />;
};

export default MusicPage;

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { id } = params;

  const apiResponse = await fetch(`https://musicopy-02.vercel.app/api/music/${id}`);
  if (apiResponse.ok) {
    const props = await apiResponse.json();
    return { props };
  }
  if (res) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
}
