import React from 'react'
import { Link } from 'react-router-dom'

export const AnecdoteList = ({ anecdotes }) => (
  <div className='my-[50px]'>
    <h2 className='text-6xl'>Anecdotes</h2>
    <ul className='mt-2'>
      {anecdotes.map(anecdote => (
        <li className='ml-5' key={anecdote.id} >
          <Link to={`/quotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)
