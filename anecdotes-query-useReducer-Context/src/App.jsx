import React from 'react'
import './App.css'

import { Routes, Route, Link } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addQuote, getQuotes, updateQuote } from './requests/requests'
import { useAnecdoteDispatch } from './context/AnecdoteContext'

import { Home } from './components/Home'
import { AddQuote } from './components/AddQuote'
import { Footer } from './components/Footer'

function App() {

  const dispatch = useAnecdoteDispatch()
  const queryClient = useQueryClient()

  const newQuoteMutation = useMutation(addQuote, {
    onSuccess: (newQuote) => {
      dispatch({ type: 'MESSAGE', payload: `${newQuote.quote} was added to the list!` })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
      const quotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', quotes.concat(newQuote))
    },
    onError: () => {
      dispatch({ type: 'MESSAGE', payload: 'Quote must be at least 5 characters long.' })
      dispatch({ type: 'TYPE', payload: 'error' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
        dispatch({ type: 'TYPE', payload: 'add' })
      }, 5000)
    }, retry: 1
  })

  const updateQuoteMutation = useMutation(updateQuote, {
    onSuccess: (newQuote) => {
      const quotes = queryClient.getQueryData('anecdotes')
      const newQuotes = quotes.map(elem => elem.id !== newQuote.id ? elem : newQuote)
      queryClient.setQueryData('anecdotes', newQuotes)
    }
  })

  const submitQuote = async (e) => {
    e.preventDefault()
    const quote = e.target.quote.value

    newQuoteMutation.mutate({ quote, likes: 0 })
    e.target.quote.value = ''
  }

  const submitLike = async (quote) => {
    updateQuoteMutation.mutate({ ...quote, likes: quote.likes + 1 })
    dispatch({ type: 'MESSAGE', payload: `You just liked ${quote.quote}!` })
    setTimeout(() => {
      dispatch({ type: 'MESSAGE', payload: null })
    }, 5000)
  }

  const result = useQuery('anecdotes', getQuotes, {
    refetchOnWindowFocus: false,
    retry: 3
  })

  return (
    <>
      <div className='flex gap-x-5'>
        <Link to="/">Home</Link>
        <Link to="/yourquote">Create</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home result={result} submitLike={submitLike} />} />
        <Route path='yourquote' element={<AddQuote submitQuote={submitQuote} />} />
      </Routes>
      <Footer />
    </>


  )
}

export default App