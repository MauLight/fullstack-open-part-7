import { useEffect } from 'react'
import { getAll, deleteBlog, setToken, create, update } from '../services/blogs'
import { setBlogList } from '../reducers/blogReducer'
import { setNotification, setType } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'

export const useLogin = () => {

  const dispatch = useDispatch()

  const logUser = async (LogObj) => {
    try {
      const user = await loginService.login(LogObj)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setToken(user.token)
      console.log(user)
      dispatch(setUser(user))
      getAll()
        .then(response => {
          console.log('promise fulfilled!')
          dispatch(setBlogList(response)) //Goes to store
          console.log(response)
        })
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
  const blogs = useSelector(state => state.bloglist)

  const handleDelete = (id, title) => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      console.log(id)
      deleteBlog(id)
        .then(() => {
          dispatch(setType('add'))
          dispatch(setNotification(`${title} was deleted!`, 5000))
          console.log('Number deleted!')
          getAll()
            .then(response => {
              console.log('promise fulfilled!')
              dispatch(setBlogList(response))
            })
        })
        .catch(error => {
          console.log(error)
          dispatch(setType('error'))
          dispatch(setNotification(`'${title}' was already deleted from the server.`, 5000))
          dispatch(setBlogList(blogs?.filter(elem => elem.id !== id)))
        })
    }

  }

  return {
    handleDelete
  }

}

export const useSubmit = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.username)
  const blogs = useSelector(state => state.bloglist)

  const handleSubmit = (blogObj, ref) => {

    if (blogObj.title === '' || blogObj.author === '' || blogObj.url === '') {
      alert('You need to add a title, author and url before submitting.')
      return -1
    }

    const titleFilter = blogs.filter((elem) => elem.title === blogObj.title)

    if (titleFilter.length > 0) {
      const blog = titleFilter[0]
      if (window.confirm(`${blog.title} by ${blog.author} was added previously, replace it?`)) {
        ref.current.toggleVisibility()
        update(blog.id, blogObj)
          .then(() => {
            getAll()
              .then(response => {
                console.log('promise fulfilled!')
                dispatch(setBlogList(response))
                dispatch(setType('add'))
                dispatch(setNotification(`${blogObj.title} by ${blogObj.author} updated!`, 5000))
              })
          })
          .catch(error => {
            dispatch(setType('error'))
            if (error.response.data.error) {
              dispatch(setNotification(error.response.data.error, 5000))
              getAll()
                .then(response => {
                  console.log('promise fulfilled!')
                  dispatch(setBlogList(response))
                })
            }
            else {
              dispatch(setNotification(`${blogObj.title} was already deleted from the server.`, 5000))
              dispatch(setBlogList(blogs?.filter(elem => elem.id !== blog.id)))
            }
          })
      }
      return -1
    }

    ref.current.toggleVisibility()
    create(blogObj)
      .then(response => {
        console.log('response is: ', response)
        console.log('User is: ', user)
        dispatch(setBlogList(blogs.concat(response)))
        console.log('data added!')
        dispatch(setType('add'))
        dispatch(setNotification(`${blogObj.title} by ${blogObj.author} added!`, 5000))
      })
      .catch(error => {
        dispatch(setNotification(error.response.data.error, 5000))
        console.log(error.response.data.error)
      })

    return 1
  }

  return {
    handleSubmit
  }

}

export const useLikes = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.bloglist)

  const handleLikes = (blogObj) => {

    const titleFilter = blogs.filter((elem) => elem.title === blogObj.title)
    const blog = titleFilter[0]
    update(blog.id, blogObj)
      .then(() => {
        getAll()
          .then(response => {
            console.log('promise fulfilled!')
            dispatch(setBlogList(response))
            dispatch(setType('add'))
            dispatch(setNotification(`You just liked ${blogObj.title} by ${blogObj.author}!`, 5000))
          })
      })
      .catch(error => {
        dispatch(setType('error'))
        dispatch(setNotification(error.response.data.error, 5000))
        getAll()
          .then(response => {
            console.log('promise fulfilled!')
            dispatch(setBlogList(response))
          })
      })
  }

  return {
    handleLikes
  }
}

export const useFilter = () => {

  const bloglist = useSelector(state => state.bloglist)

  const filterList = (filter) => {
    const filterTitle = bloglist.filter((elem) => elem.title.toLowerCase().includes(filter) || elem.author.toLowerCase().includes(filter))
    return filterTitle
  }

  return [filterList]

}