import axios from 'axios'

const githubApi = axios.create({
  baseURL: import.meta.env.VITE_RESOURCE_URL,
  timeout: 5000
})

export async function getResource(): Promise<any> {
  try {
    const resp = await githubApi.get('/' + import.meta.env.VITE_RESOURCE_DB)
    return resp.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
