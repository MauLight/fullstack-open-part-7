import React, { useState } from 'react'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

export const CreateNew = ({ addNew }) => {
    const [message, setMessage] = useState(null)

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(content.value)
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        setMessage(`${content.value} was added to the list!`)
        setTimeout(() => {
            setMessage(null)
            navigate('/')
        }, 3000)
    }

    const handleReset = () => {
        content.onReset()
        author.onReset()
        info.onReset()
    }

    return (
        <div className='w-[400px]'>
            <h2 className='mb-2 text-3xl'>create a new anecdote</h2>
            <Notification message={message} type='add' />
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-2">
                    <div className='flex flex-col'>
                        <label className='mr-2' htmlFor='content'>content</label>
                        <input id='content' className='rounded h-8' name='content' {...content} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mr-2' htmlFor='author'>author</label>
                        <input id='author' className='rounded h-8' name='author' {...author} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mr-2' htmlFor='url'>url for more info</label>
                        <input id='url' className='rounded h-8' name='info' {...info} />
                    </div>
                    <div className="flex gap-x-2">
                        <button>create</button>
                        <button type='button' onClick={() => handleReset()}>reset</button>
                    </div>
                </div>
            </form>
        </div>
    )

}
