import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import Layout from '../../components/Layout';

const login = ({ providers }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session]);

  return (
    <Layout
      title="Login"
      description="Registrate o logueate con tu cuenta de google"
    >
      <div
        className="flex flex-col items-center justify-center
      min-h-screen py-2 -mt-56 px-14 text-center"
      >
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              >
                Inicia sesion con {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
