import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useDataDispatch } from '../context/dataContext'

import { getAll, deleteBlog, setToken, create, update } from '../services/blogs'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {

  const navigate = useNavigate()
  const dispatch = useDataDispatch()

  const logUser = async (LogObj) => {
    try {
      const user = await loginService.login(LogObj)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setToken(user.token)
      dispatch({ type: 'USER', payload: user })
      navigate('/blogs')
    }
    catch (expection) {

      dispatch({ type: 'TYPE', payload: 'error' })
      dispatch({ type: 'MESSAGE', payload: 'wrong credentials' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    }

  }

  const logOutUser = () => {

    dispatch({
      type: 'USER', payload: {
        id: '',
        name: '',
        username: '',
        token: ''
      }
    })
    window.localStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'USER', payload: user })
      setToken(user.token)
    }
  }, [])

  return {
    logUser,
    logOutUser
  }
}

export const useDelete = () => {

  const dispatch = useDataDispatch()
  const queryClient = useQueryClient()

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      dispatch({ type: 'TYPE', payload: 'add' })
      dispatch({ type: 'MESSAGE', payload: 'Post was deleted!' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    },
    onError: () => {
      dispatch({ type: 'TYPE', payload: 'error' })
      dispatch({ type: 'MESSAGE', payload: 'The blog entry could not be deleted from the server.' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    }, retry: 1
  })

  const handleDelete = (id, title) => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      deleteBlogMutation.mutate(id)
      const blogs = queryClient.getQueryData('bloglist')
      const newBlogs = blogs.filter(elem => elem.id !== id)
      queryClient.setQueryData('bloglist', newBlogs)
    }

  }

  return {
    handleDelete
  }

}

export const useSubmit = () => {

  const navigate = useNavigate()
  const dispatch = useDataDispatch()

  const { data } = useQuery('bloglist', getAll, {
    refetchOnWindowFocus: false,
    retry: 3
  })

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(create, {
    onSuccess: (newBlog) => {
      dispatch({ type: 'TYPE', payload: 'add' })
      dispatch({ type: 'MESSAGE', payload: `${newBlog.title} by ${newBlog.author} was added to the list!` })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
      const blogs = queryClient.getQueryData('bloglist')
      const filterBlogs = data.filter(elem => elem.user.id === newBlog.user)
      const newEntry = { ...newBlog, user: filterBlogs[0].user }
      queryClient.setQueryData('bloglist', blogs.concat(newEntry))
      navigate('/blogs')
    },
    onError: () => {
      dispatch({ type: 'TYPE', payload: 'error' })
      dispatch({ type: 'MESSAGE', payload: 'Quote must be at least 5 characters long.' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    }, retry: 1
  })

  const updateBlogMutation = useMutation(update, {
    onSuccess: (updatedBlog) => {
      dispatch({ type: 'TYPE', payload: 'add' })
      dispatch({ type: 'MESSAGE', payload: `${updatedBlog.title} by ${updatedBlog.author} was updated!` })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
      const blogs = queryClient.getQueryData('bloglist')
      const newBlogs = blogs.map(elem => elem.id !== updatedBlog.id ? elem
        : {
          ...elem,
          author: updatedBlog.author,
          id: updatedBlog.id,
          likes: updatedBlog.likes,
          title: updatedBlog.title,
          url: updatedBlog.url
        })
      console.log(newBlogs)
      queryClient.setQueryData('bloglist', newBlogs)
      navigate('/blogs')
    },
    onError: () => {
      dispatch({ type: 'TYPE', payload: 'error' })
      dispatch({ type: 'MESSAGE', payload: 'The blog was not updated due to a connection error.' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    }, retry: 1
  })

  const handleSubmit = (blogObj, ref) => {

    if (blogObj.title === '' || blogObj.author === '' || blogObj.url === '') {
      alert('You need to add a title, author and url before submitting.')
      return -1
    }

    const titleFilter = data.filter((elem) => elem.title === blogObj.title)

    if (titleFilter.length > 0) {
      const blog = titleFilter[0]
      if (window.confirm(`${blog.title} by ${blog.author} was added previously, replace it?`)) {
        ref.current.toggleVisibility()

        const updatedBlog = {
          title: blogObj.title,
          author: blogObj.author,
          url: blogObj.url,
          likes: blogObj.likes,
          id: blog.id
        }

        updateBlogMutation.mutate(updatedBlog)

        return -1
      }

    }

    newBlogMutation.mutate(blogObj)

    return 1
  }

  return {
    handleSubmit
  }

}

export const useLikes = () => {

  const dispatch = useDataDispatch()
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(update, {
    onSuccess: (updatedBlog) => {
      dispatch({ type: 'TYPE', payload: 'add' })
      dispatch({ type: 'MESSAGE', payload: `You just liked ${updatedBlog.title} by ${updatedBlog.author}!` })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)

      const blogs = queryClient.getQueryData('bloglist')
      const newBlogs = blogs.map(elem => elem.id !== updatedBlog.id ? elem
        : {
          ...elem,
          author: updatedBlog.author,
          id: updatedBlog.id,
          likes: updatedBlog.likes,
          title: updatedBlog.title,
          url: updatedBlog.url
        })

      queryClient.setQueryData('bloglist', newBlogs)
    },
    onError: () => {
      dispatch({ type: 'TYPE', payload: 'error' })
      dispatch({ type: 'MESSAGE', payload: 'The blog was not updated due to a connection error.' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    }, retry: 1
  })

  const handleLikes = (blogObj) => {
    updateBlogMutation.mutate(blogObj)

  }

  return {
    handleLikes
  }
}

export const useComment = () => {

  const dispatch = useDataDispatch()
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(update, {
    onSuccess: (updatedBlog) => {
      dispatch({ type: 'TYPE', payload: 'add' })
      dispatch({ type: 'MESSAGE', payload: `You just commented on ${updatedBlog.title} by ${updatedBlog.author}!` })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)

      const blogs = queryClient.getQueryData('bloglist')
      const newBlogs = blogs.map(elem => elem.id !== updatedBlog.id ? elem
        : {
          ...elem,
          author: updatedBlog.author,
          id: updatedBlog.id,
          likes: updatedBlog.likes,
          title: updatedBlog.title,
          url: updatedBlog.url,
          comments: updatedBlog.comments
        })

      queryClient.setQueryData('bloglist', newBlogs)
    },
    onError: () => {
      dispatch({ type: 'TYPE', payload: 'error' })
      dispatch({ type: 'MESSAGE', payload: 'The blog was not updated due to a connection error.' })
      setTimeout(() => {
        dispatch({ type: 'MESSAGE', payload: null })
      }, 5000)
    }, retry: 1
  })

  const handleComment = (blogObj) => {
    updateBlogMutation.mutate(blogObj)

  }

  return {
    handleComment
  }
}

export const useFilter = () => {

  const filterList = (filter, list) => {
    const filterTitle = list.filter((elem) => elem.title.toLowerCase().includes(filter) || elem.author.toLowerCase().includes(filter))
    return filterTitle
  }

  return [filterList]

}

export const useMap = (result) => {

  const users = result.data.map(elem => elem.user.username)

  let usersObj = {}

  for (let i = 0; i < users.length; i++) {
    if (usersObj[users[i]] === undefined) {
      usersObj[users[i]] = 1
    }
    else {
      usersObj[users[i]] = usersObj[users[i]] + 1
    }
  }

  let usersArr = []

  for (const [key, value] of Object.entries(usersObj)) {
    let auxObj = {}
    auxObj.user = key,
    auxObj.blogs = value
    usersArr.push(auxObj)
  }

  usersArr.forEach(user => {
    const userBlogList = result.data.filter(elem => elem.user.username === user.user)
    user.bloglist = userBlogList
  })

  return usersArr

}