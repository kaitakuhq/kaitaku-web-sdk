
import { config } from "../../config";
import { ErrorResponse, HttpResponse } from "../types/types";
import { snakeToCamel } from "../util/snakeToCamel";

export async function makeRequest<T>(
    path: string,
    token: string,
    params?: RequestInit,
): Promise<HttpResponse<T>> {
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
        .then(res => snakeToCamel(res) as HttpResponse<T>)
        .catch(err => {
            const response: ErrorResponse = {
                status: '',
                code: 'NetworkError',
            }
            throw response
        })
}
