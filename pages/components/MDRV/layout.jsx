import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const style = {
    layout: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#212121'
    },
    ul: {
      listStyleType: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      width: '300px'
    },
    li: {
      textAlign: 'center'
    },
    a: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
      padding: '10px',
      borderRadius: '5px',
      transition: 'background-color 0.3s',
      '&:hover': {
        backgroundColor: '#424242',
      }
    },
    main: {
      padding: '20px',
      flex: 1,
    },
  };

  return (
    <div style={style.layout}>
      <nav style={style.nav}>
        <ul style={style.ul}>
          <li style={style.li}>
            <Link href="/">
              <a style={style.a}>Home</a>
            </Link>
          </li>
          <li style={style.li}>
            <Link href="/dashboard">
              <a style={style.a}>Dashboard</a>
            </Link>
          </li>
          <li style={style.li}>
            <Link href="/templates">
              <a style={style.a}>Templates</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main style={style.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
