import { Request } from "express"

export interface userDetails {
    displayName: string,
    email: string,
    google_user: boolean
}

export interface Payload {
    email: string,
    user_id: number
    accessToken?: string
}

export interface requestWithUser extends Request {
    user: Payload
}
