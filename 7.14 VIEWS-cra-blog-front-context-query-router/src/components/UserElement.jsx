import { Link } from 'react-router-dom'
import { useDelete } from '../hooks'

export const UserElement = ({ elem }) => {

  const { handleDelete } = useDelete()

  return (
    <>
      <li className='blog mt-5' key={elem.title}>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center">
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
        </div>
      </li>
    </>
  )
}