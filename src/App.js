import React, { useState } from 'react';
import styled from 'styled-components'
import { Button } from './button/button.component'
import { Loader } from './loader/loader.component'

const SideBar = styled.section`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;

  ${Button} {
    margin-bottom: 10px;
  }
`

const Canvas = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const incrementor = 10;
const distance = 3;
const minimum = 10;

const createElementIndices = length => new Array(length).fill(null).map((item, index) => index)

function App() {
  const [elements, setElements] = useState(createElementIndices(minimum))
  const decrementDisabled = elements.length <= minimum
  const increment = () => setElements(createElementIndices(elements.length + incrementor))
  const decrement = () => !decrementDisabled && setElements(createElementIndices(elements.length - incrementor))

  return (
    <React.Fragment>
      <SideBar>
        <Button onClick={increment}>Add 10</Button>
        <Button onClick={decrement} disabled={decrementDisabled}>Subtract 10</Button>
        <Button>Stop</Button>
        <Button>Optimize</Button>
      </SideBar>

      <Canvas>
        {
          elements.map(id => <Loader key={id} />)
        }
      </Canvas>
    </React.Fragment>
  );
}

export default App;
