import { Injectable } from '@angular/core';
import { BaseApiService } from "./base-api.service";
import { UserDto, UserUpdateDto } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: BaseApiService) { }

  public updateById(id: number, userUpdateDto: UserUpdateDto) {
    return this.apiService.put<UserDto>("/users/" + id, userUpdateDto, true)
  }

}
