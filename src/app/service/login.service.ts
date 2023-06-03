import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApiService} from './base-api.service';
import { LoginRequest, UserCreateDto, UserDto } from "../model/user";
import { FilesSimilarPair } from "../model/files-similar-pair";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: BaseApiService) {
  }

  login(request: LoginRequest): Observable<UserDto> {
    return this.apiService.post<UserDto>('/users/login', request)
  }

  register(userCreateDto: UserCreateDto): Observable<UserDto> {
    return this.apiService.post<UserDto>('/users/register', userCreateDto)
  }

}
