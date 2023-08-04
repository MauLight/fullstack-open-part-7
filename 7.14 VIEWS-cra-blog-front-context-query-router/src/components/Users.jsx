import React from 'react'
import { useQuery } from 'react-query'
import { getAll } from '../services/blogs'
import { useMap } from '../hooks'
import { Link } from 'react-router-dom'

export const Users = () => {

  const result = useQuery('bloglist', getAll, {
    refetchOnWindowFocus: false,
    retry: 3
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <p>The blog service is not available due to problems with the server.</p>
  }

  const usersMap = result ? useMap(result) : null

  return (
    <div className='px-[400px] mt-20'>
      <div className="flex gap-x-5 justify-between items-center my-2">
        <p className='font-bold text-4xl'>User</p>
        <p className='font-bold text-4xl'>Blogs</p>
      </div>
      <ul>
        {
          usersMap.map(elem => (
            <li key={elem.user}>
              <Link to={`/users/${elem.bloglist[0].user.id}`}>
                <div className="flex gap-x-5 justify-between items-center">
                  <p className='text-xl'>{elem.user}</p>
                  <p className='text-xl'>{elem.blogs}</p>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

