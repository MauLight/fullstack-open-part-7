import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      console.log(action.payload)
      return action.payload
    },
    addLikes(state, action) {
      const id = action.payload.id
      const blogToChange = state.find(b => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    }
  }
})

export const { addBlog, addLikes } = blogSlice.actions

export const setBlogList = (blogs) => {
  console.log(blogs)
  return dispatch => {
    dispatch(addBlog(blogs))
  }
}

export const setLikes = (id) => {
  return async dispatch => {
    dispatch(addLikes(id))
  }
}

export default blogSlice.reducer