import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  username: '',
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      const id = action.payload.id
      const username = action.payload.username
      const name = action.payload.name
      const token = action.payload.token

      return { ...state, id: id, username: username, name: name, token: token }
    }
  }
})

export const { addUser } = userSlice.actions

export const setUser = (user) => {
  return dispatch => {
    dispatch(addUser(user))
  }
}

export default userSlice.reducer