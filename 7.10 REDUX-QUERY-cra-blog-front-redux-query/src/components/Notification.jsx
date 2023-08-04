import { useSelector } from 'react-redux'

export default function Notification() {

  const message = useSelector(state => state.notifications.message)
  const type = useSelector(state => state.notifications.type)

  console.log(type)

  if (message === null) {
    return null
  }

  return (
    <div id="error" className={type === 'add' ? 'bg-green-700 text-lg p-5 rounded my-2' : 'bg-red-600 text-lg p-5 rounded my-2'}>
      {message}
    </div>
  )
}
