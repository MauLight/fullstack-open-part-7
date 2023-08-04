import React from 'react'

export const Quote = ({ quote, submitLike }) => {

  console.log(quote)

  return (
    <div key={quote.id} className='flex items-center text-left text-2xl my-3'>
      <p>{quote.quote}</p>
      <p className='ml-2'>{`has ${quote.likes} ${quote.likes > 1 || quote.likes === 0 ? 'likes' : 'like'}`}</p>
      <button onClick={() => submitLike(quote)}>Like!</button>
    </div>
  )
}
