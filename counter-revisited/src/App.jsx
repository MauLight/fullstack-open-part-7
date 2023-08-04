import useCounter from './hooks/useCounter'

const App = () => {

  const {value, increase, decrease, zero} = useCounter()

  return (
    <div>
      <div className='text-8xl text-center mb-2'>{value}</div>
      <button onClick={increase}>
        plus
      </button>
      <button onClick={decrease}>
        minus
      </button>      
      <button onClick={zero}>
        zero
      </button>
    </div>
  )
}

export default App