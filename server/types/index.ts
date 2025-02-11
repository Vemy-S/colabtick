import { roles } from "@prisma/client"
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
    role?: roles | null
}

export interface requestWithUser extends Request {
    user: Payload
}
