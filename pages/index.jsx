import Layout from '../components/Layout';
import Main from '../components/Main';

export default function Home() {
  return (
    <Layout
      title="Inicio"
      description="Pagina creada para escuchar musica completamente gratis y sin copiryght que se puede descargar para utilizarla en cualquier proyecto"
    >
      <div>
        <div className="mt-6">
          <h2 className="text-sm sm:text-lg flex justify-center font-bold text-purple-700">
            MusiCopy el lugar donde puedes escuchar musica gratis
          </h2>
          <br />
          <p className="text-xs sm:text-sm flex justify-center -mt-4 mb-6 font-semibold text-purple-600">
            Disfrute de toda nuestra variedad
            <audio controls>
              <source src="../public/musica/emergency.mp3" type="audio/mp3" />
            </audio>
          </p>
        </div>
        <div>
          <Main />
        </div>
      </div>
    </Layout>
  );
}
