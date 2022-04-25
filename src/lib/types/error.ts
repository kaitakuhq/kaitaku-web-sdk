import { HttpResponse } from "./types"

export enum KaitakuErrorCode {
    NotConnected = 'NotConnected',
    Unauthorized = 'Unauthorized',
    UnknownSDKError = 'UnknownSDKError',
}

enum HTTPErrorStatusCode {
    InternalServerErr = 'Internal Server Error',
    InvalidRequest = 'Invalid Request',
    NotConnected = 'Not Connected',
    NotFound = 'Not Found',
    Unauthorized = 'Unauthorized',
}

export interface HTTPError extends Error {
    appStatusCode?: HTTPErrorStatusCode
    responseCode?: string
    responseError?: string
}

export const NewHttpError = (resp: HttpResponse<undefined>): HTTPError => {
    const err = new Error()

    let appStatusCode
    switch (resp.code) {
        case HTTPErrorStatusCode.InvalidRequest:
            appStatusCode = HTTPErrorStatusCode.InvalidRequest
            break
        case HTTPErrorStatusCode.NotConnected:
            appStatusCode = HTTPErrorStatusCode.NotConnected
            break
        case HTTPErrorStatusCode.NotFound:
            appStatusCode = HTTPErrorStatusCode.NotFound
            break
        case HTTPErrorStatusCode.Unauthorized:
            appStatusCode = HTTPErrorStatusCode.Unauthorized
            break
        case HTTPErrorStatusCode.InternalServerErr:
            appStatusCode = HTTPErrorStatusCode.InternalServerErr
            break
    }

    return {
        ...err,
        appStatusCode,
        responseCode: '',
        responseError: '',
    }
}

export interface KaitakuError {
    code: KaitakuErrorCode
    message: string
}

export const NewKaitakuError = (httpError: HTTPError): KaitakuError => {
    let code = KaitakuErrorCode.UnknownSDKError
    let message = 'Please contact support.'
    switch (httpError.appStatusCode) {
        case HTTPErrorStatusCode.Unauthorized:
            code = KaitakuErrorCode.Unauthorized
            message = 'Token and project ID do not match or is not authorized.'
            break;
        case HTTPErrorStatusCode.NotFound:
        case HTTPErrorStatusCode.InvalidRequest:
        case HTTPErrorStatusCode.InternalServerErr:
            code = KaitakuErrorCode.UnknownSDKError
            break;
        case HTTPErrorStatusCode.NotConnected:
            code = KaitakuErrorCode.NotConnected
            message = 'Check device connection. If connected, please check our status page.'
            break;
    }
    return {
        code: code,
        message: message,
    }
}
