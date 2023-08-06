export interface UserWithoutSensitiveData {
  username: string;
  email: string;
}

export interface LoginResponse {
  token: string,
  user: UserWithoutSensitiveData
}