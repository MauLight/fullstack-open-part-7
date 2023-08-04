import Notification from './components/Notification'
import Card from './components/Card'
import './app.css'
import useCountry from './hooks/useCountry'

function App() {

const countries = useCountry()

  return (
    <div className="App">
      <Notification message={countries.errorMessage} />
      <label htmlFor='country'>Country: </label>
      <input value={countries.country} onChange={countries.handlechange} />
      <ul className='my-5'>
        {
          countries.filteredCountries.map((elem) => (
            <li>
              {elem.name.common}
              <button className='p-1' onClick={() => countries.handleClick(elem.name.common)} >show</button>
            </li>
          ))
        }
      </ul>
      <div>
        {
          countries.countryCard &&
          <Card
            info={countries.countryCard}
          />
        }
      </div>
    </div>
  )
}

export default App
