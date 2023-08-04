/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/Form'
import BlogList from './components/BlogList'
import BlogAdd from './components/BlogAdd'
import { Togglable } from './components/Togglable'
import Filter from './components/Filter'
import { Footer } from './components/Footer'
import './App.css'

import { useFilter, useLogin, useSubmit } from './hooks'
import { useSelector } from 'react-redux'

function App() {

  const [filter, setFilter] = useState('')
  const blogAddRef = useRef()

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.bloglist)


  const [filterList] = useFilter()

  const login = useLogin()
  const { handleSubmit } = useSubmit()

  const handleLogOut = () => {
    login.logOutUser()
  }

  const handleFilter = () => {
    filterList(filter)
  }

  useEffect(() => {
    if (blogs) {
      handleFilter()
    }
  }, [filter])

  return (
    <div className="App">
      <h1 className='mb-10'>
        Blog
      </h1>
      <Notification />
      {
        user.username.length > 0 ?
          <>
            <div className='flex gap-x-20'>
              <div className="text-center">
                <h2 className='text-2xl'>Add a New Blog</h2>
                <Togglable buttonLabel="Add" ref={blogAddRef}>
                  <BlogAdd
                    createBlog={handleSubmit}
                    blogAddRef={blogAddRef}
                  />
                </Togglable>
              </div>
              <div className="text-center">
                <h2 className='text-2xl'>{`${user.name}' Bloglist`}</h2>
                <p></p>
                <Filter filter={filter} setFilter={setFilter} />
                <BlogList
                  list={filterList(filter)}
                  user={user}
                  handleSubmit={handleSubmit}
                  blogAddRef={blogAddRef}
                />
              </div>
            </div>
            <button
              className="w-25 h-12 my-5 bg-[#e3e3e3] text-[#242424] hover:bg-[#242424] hover:text-[#e3e3e3] active:bg-[#e3e3e3] active:text-[#242424] transition-all duration-75"
              onClick={handleLogOut}
            >LogOut</button>
          </>

          :
          <>
            <Togglable buttonLabel="Log in">
              <LoginForm />
            </Togglable>
          </>
      }
      <Footer />
    </div>
  )
}

export default App
