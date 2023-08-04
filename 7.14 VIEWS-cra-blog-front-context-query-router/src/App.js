/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route, useMatch } from 'react-router-dom'
import './App.css'

import LoginForm from './components/Form'
import BlogList from './components/BlogList'
import BlogAdd from './components/BlogAdd'

import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Users } from './components/Users'
import { User } from './components/User'
import { Blog } from './components/Blog'


function App() {

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const userId = matchUser ? matchUser.params.id : null
  const blogId = matchBlog ? matchBlog.params.id : null

  return (
    <div className="App w-[80vw] min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/create" element={<BlogAdd />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User userInfo={userId} />} />
        <Route path="/blogs/:id" element={<Blog blogInfo={blogId} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
