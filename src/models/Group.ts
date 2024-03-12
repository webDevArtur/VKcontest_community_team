export interface GetGroupsResponse {
    result: 1 | 0,
    data?: Group[]
}

export interface Group {
    "id": number,
    "name": string,
    "closed": boolean,
    "avatar_color"?: string,
    "members_count": number,
    "friends"?: User[]
}

export interface User {
    "first_name": string,
    "last_name": string
}

export interface CustomSelectOptionInterface {
    value: string;
    label: string;
}

export const avatarColors: { [key: string]: string } = {
    red: '#e81414',
    blue: '#1919b4',
    green: '#077907',
};
