import { useEffect } from 'react'
import { getAll, deleteBlog, setToken, create, update } from '../services/blogs'
import { setNotification, setType } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useLogin = () => {

  const dispatch = useDispatch()

  const logUser = async (LogObj) => {
    try {
      const user = await loginService.login(LogObj)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setToken(user.token)
      dispatch(setUser(user))
    }
    catch (expection) {
      setNotification('wrong credentials', 5000)
    }

  }

  const logOutUser = () => {
    dispatch(setUser({
      id: '',
      name: '',
      username: '',
      token: ''
    }))
    window.localStorage.clear()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      setToken(user.token)
    }
  }, [])

  return {
    logUser,
    logOutUser
  }
}

export const useDelete = () => {

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      dispatch(setNotification('Post was deleted!', 5000))
    },
    onError: () => {
      dispatch(setType('error'))
      dispatch(setNotification('The blog entry could not be deleted from the server.', 5000))
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

  const dispatch = useDispatch()

  const { data } = useQuery('bloglist', getAll, {
    refetchOnWindowFocus: false,
    retry: 3
  })

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation(create, {
    onSuccess: (newBlog) => {
      dispatch(setType('add'))
      dispatch(setNotification(`${newBlog.title} by ${newBlog.author} was added to the list!`, 5000))
      const blogs = queryClient.getQueryData('bloglist')
      console.log(blogs)
      console.log(newBlog)
      const filterBlogs = blogs.filter(elem => elem.user.id === newBlog.user)
      const newEntry = { ...newBlog, user: filterBlogs[0].user }
      console.log(newEntry)
      queryClient.setQueryData('bloglist', blogs.concat(newEntry))
    },
    onError: () => {
      dispatch(setType('error'))
      dispatch(setNotification('Quote must be at least 5 characters long.', 5000))
    }, retry: 1
  })

  const updateBlogMutation = useMutation(update, {
    onSuccess: (updatedBlog) => {
      dispatch(setType('add'))
      dispatch(setNotification(`${updatedBlog.title} by ${updatedBlog.author} was updated!`, 5000))
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
    },
    onError: () => {
      dispatch(setType('error'))
      dispatch(setNotification('The blog was not updated due to a connection error.', 5000))
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

  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation(update, {
    onSuccess: (updatedBlog) => {
      console.log(updatedBlog)
      dispatch(setType('add'))
      dispatch(setNotification(`${updatedBlog.title} by ${updatedBlog.author} was updated!`, 5000))
      const blogs = queryClient.getQueryData('bloglist')
      console.log(blogs)
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
    },
    onError: () => {
      dispatch(setType('error'))
      dispatch(setNotification('The blog was not updated due to a connection error.', 5000))
    }, retry: 1
  })

  const handleLikes = (blogObj) => {
    updateBlogMutation.mutate(blogObj)

  }

  return {
    handleLikes
  }
}

export const useFilter = () => {

  const filterList = (filter, list) => {
    const filterTitle = list.filter((elem) => elem.title.toLowerCase().includes(filter) || elem.author.toLowerCase().includes(filter))
    return filterTitle
  }

  return [filterList]

}