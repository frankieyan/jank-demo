import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components'
import { Button } from './button/button.component'

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

const Element = styled.span`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background: #0088bf;
  position: absolute;
  visibility: ${props => props.isProtoType ? 'hidden' : 'visible'};
`

const elementRefCache = []

function App() {
  const incrementor = 10;
  const distance = 3;
  const minimum = 10;
  const [elements, setElements] = useState([])
  const canvasRef = useRef()
  const protoTypeRef = useRef()
  const frameRef = useRef()
  const optimizedRef = useRef()
  const decrementDisabled = elements.length <= minimum

  const cancelElementUpdates = () => {
    cancelAnimationFrame(frameRef.current)
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

  const toggleOptimized = () => {
    optimizedRef.current = !optimizedRef.current
  }

  const requestNewElementUpdates = ({ newLength = null } = {}) => {
    const canvasSize = canvasRef.current.getBoundingClientRect()
    const protoTypeSize = protoTypeRef.current.getBoundingClientRect()
    const maxWidth = Math.floor(canvasSize.width - protoTypeSize.width) / canvasSize.width * 100
    const maxHeight = Math.floor(canvasSize.height - protoTypeSize.height)
    const createElementIndices = length => new Array(length).fill(null).map((_item, index) => ({ id: index }))

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
          if (optimizedRef.current) {
            const currentTop = parseInt(top.slice(0, top.indexOf('px')))
            const newTop = direction === 'down' ? currentTop + distance : currentTop - distance
            if (newTop < 0) return 0
            if (newTop > maxHeight) return maxHeight
            return newTop
          } else {
            const newTop = direction === 'down'
              ? elementRefCache[id].offsetTop + distance
              : elementRefCache[id].offsetTop - distance
            if (newTop < 0) return 0
            if (newTop > maxHeight) return maxHeight
            return newTop
          }
        }

        if (optimizedRef.current) {
          const newTop = getNewTop()
          const newDirection = (newTop === 0) ? 'down' : (newTop === maxHeight) ? 'up' : direction
          return { id, left, top: `${newTop}px`, direction: newDirection }
        } else {
          elementRefCache[id].style.top = `${getNewTop()}px`
          const newDirection = (elementRefCache[id].offsetTop === 0) ? 'down' : (elementRefCache[id].offsetTop === maxHeight) ? 'up' : direction
          return { id, left: elementRefCache[id].offsetLeft, top: elementRefCache[id].style.top, direction: newDirection }
        }
      })

    setElements(previousElements => {
      return (typeof newLength === 'number' || previousElements.length === 0)
        ? createNewElements(typeof newLength === 'number' ? newLength : minimum)
        : createUpdatedElements(previousElements)
    })

    frameRef.current = requestAnimationFrame(() => {
      requestNewElementUpdates()
    })
  }

  useEffect(() => {
    frameRef.current = requestAnimationFrame(() => requestNewElementUpdates())
    return cancelElementUpdates
  }, []);

  return (
    <React.Fragment>
      <SideBar>
        <Button onClick={increment}>Add 10</Button>
        <Button onClick={decrement} disabled={decrementDisabled}>Subtract 10</Button>
        <Button onClick={toggleOptimized}>{optimizedRef.current ? 'Un-optimize' : 'Optimize'}</Button>
      </SideBar>

      <Canvas ref={canvasRef}>
        <Element ref={protoTypeRef} isProtoType />
        {
          elements.map(({ id, top, left }) => <Element key={id} style={{ top, left }} ref={ref => elementRefCache[id] = ref} />)
        }
      </Canvas>
    </React.Fragment>
  );
}

export default App;
