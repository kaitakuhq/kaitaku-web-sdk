import { KaitakuProps, ProjectState } from "../lib/types/types"

export const category = [
    {
        id: 'category-1',
        name: 'Feature Request',
        description: 'To request a new feature',
        state: ProjectState.active
    },
    {
        description: 'To tell us about what frustrates you',
        id: 'category-2',
        name: 'Frustration',
        state: ProjectState.active
    },
]

export const comment = [
    {
        id: 'comment1',
        comment: 'Navigation is not usable',
        categoryId: 'category-1234',
        createdAt: 1234,
        userId: 'user-1234',
        userVoted: true,
        votes: 5,
    },
    {
        id: 'comment2',
        comment: 'Set the destination on the map',
        categoryId: 'category-1234',
        createdAt: 1234,
        userId: 'user-1234',
        userVoted: true,
        votes: 5,
    },
]

export const kaitakuProps: KaitakuProps = {
    onError: () => { },
    projectId: 'proj-1234',
    token: 'token',
    userId: 'user-1234',
}