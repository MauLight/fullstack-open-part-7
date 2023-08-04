import axios from "axios"

export const getWeather = async (baseUrl) => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

export const getCountries = async () => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    const response = await request
    return response.data
}

