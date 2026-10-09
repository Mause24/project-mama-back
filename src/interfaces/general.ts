export enum PROFILES {
    ADMIN = 1,
    CLIENT = 2,
    STAFF = 3,
}
export enum PARAMETER_TYPE {
    STRING = 1,
    NUMBER = 2,
    BOOLEAN = 3,
    DATE = 4,
    OPTIONS = 5,
}

export interface JWTInterface {
    id: number
    email: string
    password: string
    profileId: PROFILES
    iat?: number
}
