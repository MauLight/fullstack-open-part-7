export const dataReducer = (state, action) => {
  switch (action.type) {
  case 'USER':
    return { ...state, user: action.payload }
  case 'MESSAGE':
    return { ...state, message: action.payload }
  case 'TYPE':
    return { ...state, type: action.payload }
  }
}