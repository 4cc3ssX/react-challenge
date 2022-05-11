import { useEffect, useState } from "react"

import Axios, { AxiosResponse } from "axios"
import { apiConfigs } from "../../configs"

const { CancelToken, isCancel, create } = Axios

export interface InterfaceUseAxios {
    baseURL: string
}

export const successResolver = <T>({ data }: AxiosResponse<T>) => data

export const useAxios = ({
    baseURL,
}: InterfaceUseAxios) => {

    const Request = create({
        baseURL,
    })
    Request.defaults.headers.common["X-Api-Key"] = apiConfigs.API_KEY

    return {
        Request,
    }
}
