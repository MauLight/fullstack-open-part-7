import React from 'react'

export const Home = ({ result, submitLike }) => {

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <p>The anecdote service is not available due to problems with the server.</p>
  }

  const quotes = result.data

  return (
    <div className="App">
      <div className="flex items-center justify-center mt-10">
        <ul>
          {quotes.map(elem => (
            <li key={elem.id} className='flex items-center text-left text-2xl my-3'>
              <p>{elem.quote}</p>
              <p className='ml-2'>{`has ${elem.likes} ${elem.likes > 1 || elem.likes === 0 ? 'likes' : 'like'}`}</p>
              <button onClick={() => submitLike(elem)}>Like!</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
