import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    "Content-Type": 'application/json'
  }
})

instance.interceptors.request.use(function (config) {
  return config
})