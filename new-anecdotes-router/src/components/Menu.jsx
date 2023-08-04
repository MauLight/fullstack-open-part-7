import React from 'react'

export const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div className='flex gap-x-10'>
        <a href='/' style={padding}>anecdotes</a>
        <a href='/create' style={padding}>create new</a>
        <a href='/about' style={padding}>about</a>
      </div>
    )
  }


