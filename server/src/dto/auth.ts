export class RegisterDto {
    name: string
    email: string
    password: string
    urlImage: string
    role: string
}

export class LoginDto {
    email: string
    password: string
    appType: string
}
