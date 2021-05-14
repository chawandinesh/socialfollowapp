import React from 'react';
import {Context} from './src/context/Context';
import Routes from './src/routes/routes';
export default function App() {
  return (
    <Context>
      <Routes />
    </Context>
  );
}
