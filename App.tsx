import React, { Fragment } from 'react';

import MiComponente from "./MiComponente"
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <Fragment>
      <StatusBar style="dark" />
      <MiComponente />
    </Fragment>
  );
}
