/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types'
import { useFilter } from '../hooks'
import { useQuery } from 'react-query'
import { getAll } from '../services/blogs'
import { useState } from 'react'
import Filter from './Filter'
import { useDataValue } from '../context/dataContext'
import { useNavigate } from 'react-router-dom'
import { UserElement } from './UserElement'

const BlogList = () => {

  const data = useDataValue()
  const user = data.user

  const navigate = useNavigate()

  const [filter, setFilter] = useState('')
  const [filterList] = useFilter()

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

  const list = filterList(filter, result.data)
  const sortedList = [...list].sort((a, b) => a.likes < b.likes ? 1 : -1)

  return (
    <div>
      <h2 className='text-5xl'>{`${user.name}'s Bloglist`}</h2>
      <div className="flex justify-between items-center my-5">
        <button className='mr-5' onClick={() => navigate('/create')}>Create blog</button>
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <ul className='my-20'>
        {
          sortedList && sortedList.map((elem) =>
            <UserElement key={elem.id} elem={elem} />)
        }
      </ul>
    </div>
  )
}

export default BlogList

BlogList.propTypes = {
  user: PropTypes.object.isRequired
}
