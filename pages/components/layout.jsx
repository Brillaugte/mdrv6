// components/Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/templates">Templates</a></li>
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
