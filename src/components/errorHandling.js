import { AxiosError } from "axios"

export const getErrorMessage = (error) => {
  if (error instanceof AxiosError) {
    console.error(error)
    return error.response.data.message
  }
  if (error instanceof Error) return error.message
  return error
}