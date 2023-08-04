
import React from 'react'
import { useAnecdoteValue } from '../context/AnecdoteContext'

export default function Notification() {

  const anecdote = useAnecdoteValue()

  if (anecdote.message === null) {
    return null
  }

  return (
    <div id="error" className={anecdote.type === 'add' ? 'bg-green-700 text-lg p-5 rounded my-2 text-slate-200' : 'bg-red-600 text-lg p-5 rounded my-2 text-slate-200'}>
      {anecdote.message}
    </div>
  )
}
