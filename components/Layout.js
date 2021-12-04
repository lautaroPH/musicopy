import Header from './Header';
import Head from 'next/head';

const Layout = ({ children, title, description }) => {
  return (
    <div className="h-screen overflow-y-scroll">
      <Head>
        <title>{title ? `${title} - MusiCopy` : 'MusiCopy'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
