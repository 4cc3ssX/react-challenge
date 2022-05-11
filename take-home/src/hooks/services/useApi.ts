import { apiConfigs } from "../../configs"
import { useAxios } from "../adapters/useAxios"

export const useApiBackend = () => {
    const baseURL = `${apiConfigs.BASE_URL}`

    const { Request, ...rest } = useAxios({
        baseURL,
    })

    // Sets "Authorization" header here
    // useEffect(() => {
    //     setAuth(AuthToken)
    // }, [AuthToken])

    return {
        Request,
        ...rest,
    }
}
