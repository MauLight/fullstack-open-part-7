
export default function Notification({ message }) {

    if (message === null) {
        return null
    }

    return (
        <div className="bg-red-600 text-lg p-5 rounded my-2">
            {message}
        </div>
    )
}
