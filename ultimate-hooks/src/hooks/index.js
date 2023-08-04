import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (type === 'reset') {
      setValue('')
    }
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useResource = (baseUrl) => {

  const [data, setData] = useState([])

  const getAll = async () => await axios.get(baseUrl).then(res => setData(res.data))
  const create = async quote => await axios.post(baseUrl, quote).then(res => res.data)
  const update = async (quote) => axios.put(`${baseUrl}/${quote.id}`, quote).then(res => res.data)

  const updateData = (content) => {
    setData([...data, content])
  }

  useEffect(() => {
    getAll()
  }, [])

  const dataService = {
    create,
    updateData,
    update,
    getAll
  }

  return [data, dataService]

}