export interface Config {
  nest: NestConfig
  cors: CorsConfig
  swagger: SwaggerConfig
  security: SecurityConfig
  email: EmailConfig
}

export interface NestConfig {
  port: number
}

export interface CorsConfig {
  enabled: boolean
}

export interface SwaggerConfig {
  enabled: boolean
  title: string
  description: string
  version: string
  path: string
}
export interface EmailConfig {
  username: string
  password: string
}

export interface SecurityConfig {
  expiresIn: string
  refreshIn: string
  bcryptSaltOrRound: string | number
}
