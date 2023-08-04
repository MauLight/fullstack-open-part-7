import React from 'react'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'

export const AddQuote = ({ submitQuote }) => {

  const navigate = useNavigate()

  const submitNewQuote = (e) => {
    submitQuote(e)
    navigate('/')
  }

  return (
    <div className="flex flex-col">
      <Notification />
      <form onSubmit={submitNewQuote}>
        <label className='mr-2' htmlFor='quote'>Add quote:</label>
        <input className='rounded h-8' id='quote' name='quote' type='text' />
      </form>
    </div>
  )
}
