import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const AnecdoteList = ({ anecdotes }) => {

  console.log(anecdotes)


  return (
    <div className='my-[50px]'>
    <h2 className='text-6xl mb-4'>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(quote =>
          <tr key={quote.id}>
            <td>
              <Link to={`/quotes/${quote.id}`}>
                {quote.content}
              </Link>
            </td>
            <td>
              {quote.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  )

}

