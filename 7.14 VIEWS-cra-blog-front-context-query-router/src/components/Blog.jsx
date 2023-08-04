import React from 'react'
import { useQuery } from 'react-query'
import { getAll } from '../services/blogs'
import { BlogElement } from './blogElement'

export const Blog = ({ blogInfo }) => {

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

  const blogFilter = result.data.filter(elem => elem.id === blogInfo)

  return (
    <div>
      {
        blogFilter && blogFilter.map((elem) =>
          <BlogElement key={elem.id} elem={elem} />)
      }
    </div>
  )
}