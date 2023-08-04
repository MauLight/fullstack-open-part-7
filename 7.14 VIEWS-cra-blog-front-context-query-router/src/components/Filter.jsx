/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

import PropTypes from 'prop-types'


export default function Filter({ filter, setFilter }) {

  return (
    <div className='pb-3'>
      <label className='mr-2' htmlFor='filter'>Search:</label>
      <input className='rounded h-8 mt-5' id='filter' value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}