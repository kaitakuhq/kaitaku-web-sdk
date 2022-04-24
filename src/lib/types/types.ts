import { ReactChild, ReactFragment, ReactPortal } from "react";

export interface KaitakuProps {
    projectId: string
    onError: (error: ErrorCode) => void
    token: string
}

export interface ErrorCode extends Error {
    customCode: string
    customMsg: string
}


export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

export interface HttpResponse<T> extends ErrorResponse {
    data: T
    status: string
    code?: string
    error?: string
}

export type ErrorResponse = {
    status: string
    code?: string
    error?: string
}

export enum ProjectState {
    active = 'active',
    inactive = 'inactive',
}

export interface Category {
    description: string
    id: string
    name: string
    state: ProjectState
}
