
import React from 'react'

export default function Notification({message, type}) {

  if (message === null) {
    return null
  }

  return (
    <div id="error" className={type === 'add' ? 'bg-green-700 text-lg p-5 rounded my-2 text-slate-200' : 'bg-red-600 text-lg p-5 rounded my-2 text-slate-200'}>
      {message}
    </div>
  )
}
