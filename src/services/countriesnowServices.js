import axios from 'axios'

const api = axios.create({
    baseURL: 'https://countriesnow.space/api/v0.1/'
})

export const getCountries = async () => {
    const response = await api.get('countries/flag/images')
    return response.data.data
}