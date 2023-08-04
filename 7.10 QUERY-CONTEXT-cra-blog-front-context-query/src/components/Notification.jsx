import { useDataValue } from '../context/dataContext'

export default function Notification() {

  const data = useDataValue()
  const message = data.message
  const type = data.type

  if (message === null) {
    return null
  }

  return (
    <div id="error" className={type === 'add' ? 'bg-green-700 text-lg p-5 rounded my-2' : 'bg-red-600 text-lg p-5 rounded my-2'}>
      {message}
    </div>
  )
}
