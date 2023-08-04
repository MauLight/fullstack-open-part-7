import React from 'react'
import { useQuery } from 'react-query'
import { getAll } from '../services/blogs'
import { useMap } from '../hooks'
import { UserElement } from './UserElement'

export const User = ({ userInfo }) => {

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
  const userFilter = usersMap.filter(elem => elem.bloglist[0].user.id === userInfo)

  return (
    <div>
      <h1 className='text-6xl mb-20 mt-10'>{`${userFilter[0].user}'s Bloglist`}</h1>
      {
        userFilter[0].bloglist && userFilter[0].bloglist.map((elem) =>
          <UserElement key={elem.id} elem={elem} />)
      }
    </div>
  )
}
