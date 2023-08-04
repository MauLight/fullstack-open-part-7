import React from 'react'
import Notification from './Notification'
import { useLogin } from '../hooks'
import { useDataValue } from '../context/dataContext'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  const data = useDataValue()
  const user = data.user

  const login = useLogin()
  const handleLogOut = () => {
    login.logOutUser()
  }

  return (
    <div className='w-full'>
      <div className={user.name.length === 0 ? 'flex justify-center items-center' : 'flex justify-end items-center'}>
        {
          user.name.length === 0 && <h1 className='mb-10 text-6xl'>
            Blog-List
          </h1>
        }
        {
          user.name.length > 0 &&
          <div className="flex justify-between items-center">
            <div className="flex gap-x-5 mr-5">
              <Link to={'/blogs'}>
                <p>blogs</p>
              </Link>
              <Link to={'/create'}>
                <p>create</p>
              </Link>
              <Link to={'/users'}>
                <p>users</p>
              </Link>
            </div>
            <button
              className="w-25 h-12 my-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75"
              onClick={handleLogOut}
            >LogOut</button>
          </div>
        }
      </div>
      <Notification />
    </div>
  )
}
