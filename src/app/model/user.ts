export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mainDirectoryPath: string;
  token: string;
  roles: Role[];
}
export interface Role {
  id: number;
  name: RoleEnum;
}

export enum RoleEnum {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_TEACHER = "ROLE_TEACHER",
  ROLE_STUDENT = "ROLE_STUDENT",
}

export interface LoginRequest {
  email: string,
  password: string
}

export interface UserCreateDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleName: RoleEnum;
}

export interface UserUpdateDto {
  firstName: string;
  lastName: string;
  oldPassword: string;
  newPassword: string;
}
