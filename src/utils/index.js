import axios from "axios"
let requests = axios.create({
  baseURL: "https://www.googleapis.com/",
  timeout: 5000,
})

requests.interceptors.request.use((config) => {
  return config
})

requests.interceptors.response.use(
  res => res.data,
  err => alert("糟糕！请求服务器需要科学上网。", err)
)

export default requests