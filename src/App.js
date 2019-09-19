import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components'
import { Button } from './button/button.component'
import { Loader } from './loader/loader.component'

const SideBar = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
`

const incrementor = 10;
const distance = 3;
const minimum = 10;
let maxHeight = 0
let canvasRefCache = null
let protoTypeRefCache = null
let frameCache = null

const createElementIndices = length => new Array(length).fill(null).map((_item, index) => ({ id: index }))

function App() {
  const [elements, setElements] = useState([])
  const canvasRef = createRef()
  const protoTypeRef = createRef()

  const decrementDisabled = elements.length <= minimum

  const cancelElementUpdates = () => {
    cancelAnimationFrame(frameCache)
  }

  const increment = () => {
    cancelElementUpdates()
    requestNewElementUpdates({ newLength: elements.length + incrementor })
  }

  const decrement = () => {
    if (decrementDisabled) {
      return
    }

    cancelElementUpdates()
    requestNewElementUpdates({ newLength: elements.length - incrementor })
  }

  const requestNewElementUpdates = ({ newLength = null } = {}) => {
    const canvasSize = canvasRefCache.getBoundingClientRect()
    const protoTypeSize = protoTypeRefCache.getBoundingClientRect()
    const maxWidth = Math.floor(canvasSize.width - protoTypeSize.width) / canvasSize.width * 100
    maxHeight = Math.floor(canvasSize.height - protoTypeSize.height)

    const createNewElements = newLength => createElementIndices(newLength)
      .map(({ id }) => {
        const top = Math.floor(Math.random() * (maxHeight))
        const direction = top === maxHeight ? 'up' : 'down'
        const left = `${(id / (newLength / maxWidth))}vw`

        return { id, top: `${top}px`, left, direction }
      })

    const createUpdatedElements = previousElements => previousElements
      .map(({ id, top, left, direction }) => {
        const getNewTop = () => {
          const currentTop = parseInt(top.slice(0, top.indexOf('px')))
          const newTop = direction === 'down' ? currentTop + distance : currentTop - distance
          if (newTop < 0) return 0
          if (newTop > maxHeight) return maxHeight
          return newTop
        }
        const newTop = getNewTop()
        const newDirection = (newTop === 0) ? 'down' : (newTop === maxHeight) ? 'up' : direction
        return { id, left, top: `${newTop}px`, direction: newDirection }
      })

    setElements(previousElements => {
      return (typeof newLength === 'number' || previousElements.length === 0)
        ? createNewElements(typeof newLength === 'number' ? newLength : minimum)
        : createUpdatedElements(previousElements)
    })

    frameCache = requestAnimationFrame(() => {
      requestNewElementUpdates()
    })
  }

  useEffect(() => {
    canvasRefCache = canvasRef.current
    protoTypeRefCache = protoTypeRef.current
    frameCache = requestAnimationFrame(() => requestNewElementUpdates())
    return cancelElementUpdates
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
          elements.map(({ id, top, left }) => <Element key={id} style={{ top, left }} />)
        }
      </Canvas>
    </React.Fragment>
  );
}

export default App;
