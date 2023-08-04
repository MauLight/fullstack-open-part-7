import axios from 'axios'

const baseUrl = 'http://localhost:3001/quotes'

export const getQuotes = async () => axios.get(baseUrl).then(res => res.data)
export const addQuote = async quote => axios.post(baseUrl, quote).then(res => res.data)
export const updateQuote = async (quote) => axios.put(`${baseUrl}/${quote.id}`, quote).then(res => res.data)