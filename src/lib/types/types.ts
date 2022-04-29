import { ReactChild, ReactFragment, ReactPortal } from "react";
import { KaitakuError } from "./error";

export interface KaitakuProps {
    onError: (error: KaitakuError) => void
    projectId: string
    token: string
    userId: string
}

export type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

export interface HttpResponse<T> {
    data?: T
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

export interface Comment {
    categoryId: string
    comment: string
    createdAt: number
    id: string
    userId: string
    userVoted: boolean
    votes: number
}

export interface Project {
    created: number
    id: string
    name: string
    ownerId: string
    category: Category[]
}