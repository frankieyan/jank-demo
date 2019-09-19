import React, { useState, useEffect, createRef } from 'react';
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

const Element = styled(Loader)`
  position: absolute;
  visibility: ${props => props.isProtoType ? 'hidden' : 'visible'};
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
`

const incrementor = 10;
const distance = 3;
const minimum = 10;
let maxHeight = 0

const createElementIndices = length => new Array(length).fill(null).map((_item, index) => ({ id: index }))

function App() {
  const [elements, setElements] = useState(createElementIndices(minimum))
  const canvasRef = createRef()
  const protoTypeRef = createRef()

  const decrementDisabled = elements.length <= minimum
  const increment = () => setInitialElements(elements.length + incrementor)
  const decrement = () => !decrementDisabled && setInitialElements(elements.length - incrementor)

  const setInitialElements = (length = null) => {
    const canvasSize = canvasRef.current.getBoundingClientRect()
    const protoTypeSize = protoTypeRef.current.getBoundingClientRect()
    const maxWidth = Math.floor(canvasSize.width - protoTypeSize.width) / canvasSize.width * 100
    maxHeight = Math.floor(canvasSize.height - protoTypeSize.height)

    setElements(createElementIndices(length || elements.length).map(({ id }) => {
      const top = Math.floor(Math.random() * (maxHeight))
      const direction = top === maxHeight ? 'up' : 'down'
      const left = `${(id / (elements.length / maxWidth))}vw`

      return { id, top: `${top}px`, left, direction }
    }))
  }

  useEffect(() => {
    setInitialElements()
  }, []);

  return (
    <React.Fragment>
      <SideBar>
        <Button onClick={increment}>Add 10</Button>
        <Button onClick={decrement} disabled={decrementDisabled}>Subtract 10</Button>
        <Button>Stop</Button>
        <Button>Optimize</Button>
      </SideBar>

      <Canvas ref={canvasRef}>
        <Element ref={protoTypeRef} isProtoType />
        {
          elements.map(({ id, top, left }) => <Element key={id} top={top} left={left} />)
        }
      </Canvas>
    </React.Fragment>
  );
}

export default App;
