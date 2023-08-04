import React from 'react'
import { createContext, useContext, useReducer } from 'react'
import { dataReducer } from '../reducers/dataReducer'

const DataContext = createContext()

const initialState = {
  type: 'add',
  message: null,
  user: {
    id: '',
    name: '',
    token: '',
    username: ''
  }
}

export const useDataValue = () => {
  const dataAndDispatch = useContext(DataContext)
  return dataAndDispatch[0]
}

export const useDataDispatch = () => {
  const dataAndDispatch = useContext(DataContext)
  return dataAndDispatch[1]
}

export const DataContextProvider = (props) => {

  const [data, dataDispatch] = useReducer(dataReducer, initialState)

  return (
    <DataContext.Provider value={[data, dataDispatch] }>
      {props.children}
    </DataContext.Provider>
  )
}

export default DataContext