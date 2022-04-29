
import { config } from "../../config";
import { fetchErrorToHttpError, NewHttpError } from "../types/error";
import { snakeToCamel } from "../util/snakeToCamel";

export async function makeRequest<T>(
    path: string,
    token: string,
    params?: RequestInit,
): Promise<T> {
    const url = config.BASE_API_URI + path

    // append token to header
    if (token) {
        if (!params) {
            params = {}
        }
        if (!params.headers) {
            const header = new Headers()
            params.headers = header
        }
        if (!(params.headers as Headers).get('Authorization')) {
            (params.headers as Headers).append('Authorization', 'Bearer ' + token)
        }
    }

    return fetch(url, params)
        .then(res => res.json())
        .then(res => {
            if (res.status !== 'OK') {
                const err = NewHttpError(res)
                throw err
            }
            return res.data as T
        })
        // @ts-ignore
        .then(res => snakeToCamel(res) as T)
        .catch(err => {
            if (err.appStatusCode) {
                // already converted & thrown in the few lines above
                throw err
            }
            throw fetchErrorToHttpError(err)
        })
}
