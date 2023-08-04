import React from 'react'

export const Quote = ({ quote }) => {
    return (
        <div className='ml-5' key={quote.id} >
            <p className='text-4xl mt-[100px]'>
                {quote.content}
            </p>
            <p>
                {`by ${quote.author}`}
            </p>
        </div>
    )
}
