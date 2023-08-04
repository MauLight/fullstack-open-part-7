import { Link } from 'react-router-dom'
import { useComment, useDelete, useLikes } from '../hooks'
import { useState } from 'react'

export const BlogElement = ({ elem }) => {

  const [newComment, setNewComment] = useState()

  const { handleDelete } = useDelete()
  const { handleLikes } = useLikes()
  const { handleComment } = useComment()

  const postComment = (commentObj) => {
    handleComment(commentObj)
    setNewComment('')
  }

  return (
    <>
      <li className='blog' key={elem.title}>
        <div className="flex flex-col mb-[25px] px-32">
          <div className="flex items-center justify-center mt-20">
            <Link to={`/blogs/${elem.id}`}>
              <p className='text-5xl'>{`${elem.title} - by ${elem.author}`}</p>
            </Link>
            <button
              className='p-1 ml-5 hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
              onClick={() => handleDelete(elem.id, elem.title)}
            >
              Delete
            </button>

          </div>
          <div className="flex items-center justify-between my-10">
            <div className='flex'>
              <div className="flex flex-col items-center">
                <p className="ml-2 text-2xl">{`${elem.likes} ${elem.likes > 1 ? 'likes' : 'like'}`}</p>
              </div>
              <div className="flex justify-center">
                <button
                  className='flex items-center justify-center h-[32px] px-1 mx-2 w-[60px] hover:bg-[#e3e3e3] border-1 border-[#e3e3e3] hover:text-[#242424] transition ease-in-out delay-100 active:bg-[#242424] active:text-[#e3e3e3]'
                  onClick={() => handleLikes({ title: elem.title, author: elem.author, url: elem.url, likes: elem.likes + 1, id: elem.id })}
                >
                  Like

                </button>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center">
              <div className="flex">
                <p className='ml-2 text-xl'>{'posted by '}</p>
                <Link to={`/users/${elem.user.id}`}>
                  <p className="ml-2 text-xl">{`${elem.user.username}`}</p>
                </Link>
              </div>
              <a className='text-lg' href={elem.url}>{elem.url}</a>
            </div>
          </div>
        </div>
        <p className='text-left pl-[315px] mb-2'>share your thoughts</p>
        <div className="flex flex-col justify-center items-center text-start">
          <form onSubmit={(e) => {
            e.preventDefault()
            postComment({
              title: elem.title,
              author: elem.author,
              url: elem.url,
              likes: elem.likes,
              id: elem.id,
              comments: elem.comments.concat(newComment)
            })
          }
          }
          >
            <div className='flex flex-col'>
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className='rounded-md w-[600px] h-[200px]' />
              <button className='mt-2' type='submit'>submit</button>
            </div>
          </form>
        </div>
        <div className="mt-10">
          <p className='text-left text-2xl'>comments</p>
          <ul className='text-left pl-10 mt-2'>
            {
              elem.comments && elem.comments.map((elem, i) => (
                <li key={i}>{elem}</li>
              ))
            }
          </ul>
        </div>
      </li>
    </>
  )
}