import { useQuery } from "react-query"

export const useServices = () => {
  return useQuery(['services'], () => fetch('/services.json').then(request => request.json()));
}