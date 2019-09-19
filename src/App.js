import React from 'react';
import { Button } from './button/button.component'
import { Loader } from './loader/loader.component'

function App() {
  return (
    <div>
      <Loader />
      <Button>Add 10</Button>
      <Button>Optimize</Button>
    </div>
  );
}

export default App;
