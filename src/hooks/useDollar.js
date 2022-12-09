import useSWR from "swr"
import { getDollarValue } from "../helpers/api"

export default function useDollar() {
  const { data, ...args } = useSWR("dollar", getDollarValue, {
    revalidateOnFocus: false
  })
  return {
    ...args, data, isLoading: !data
  }
}
