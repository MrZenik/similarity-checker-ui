import { Injectable } from '@angular/core';
import { UserDto } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private readonly USER_KEY = 'userData';
  private readonly TOKEN_KEY: string = 'authToken';

  constructor() {
  }

  setUser(user: UserDto) {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): UserDto {
    const userString = sessionStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  setToken(token: string) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getRoles(): string[] {
    return this.getUser().roles.map(role => role.name as string);
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  removeUser() {
    sessionStorage.removeItem(this.USER_KEY);
  }

  removeToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  clear() {
    sessionStorage.clear();
  }
}
