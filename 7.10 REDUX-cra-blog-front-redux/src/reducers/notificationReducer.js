import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: 'add'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addMessage(state, action) {
      state.message = action.payload
    },
    addType(state, action) {
      console.log(action.payload)
      state.type = action.payload
    }
  }
})

export const { addMessage, addType } = notificationSlice.actions

export const setNotification = (message, timeOut) => {
  return async dispatch => {
    dispatch(addMessage(message))
    setTimeout(() => {
      dispatch(addMessage(null))
    }, timeOut)
  }
}

export const setType = (type) => {
  return dispatch => {
    dispatch(addType(type))
  }
}

export default notificationSlice.reducer