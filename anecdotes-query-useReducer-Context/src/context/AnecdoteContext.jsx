import React from 'react'
import { createContext, useContext, useReducer } from 'react'
import { anecdoteReducer } from '../reducers/anecdoteReducer'

const AnecdoteContext = createContext()

const initialState = {
  type: 'add',
  message: null,
  quotes: []
}

export const useAnecdoteValue = () => {
  const quotesAndDispatch = useContext(AnecdoteContext)
  return quotesAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
  const quotesAndDispatch = useContext(AnecdoteContext)
  return quotesAndDispatch[1]
}

export const AnecdoteContextProvider = (props) => {
  const [anecdote, anecdoteDispatch] = useReducer(anecdoteReducer, initialState)

  return (
    <AnecdoteContext.Provider value={[anecdote, anecdoteDispatch] }>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext