import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionStorageService } from "../security/session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private readonly baseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient,
              private sessionStorageService: SessionStorageService) {
  }

  public get<T>(url: string, includeAuthorization: boolean = false, params?: HttpParams): Observable<T> {
    const fullUrl = this.baseUrl + url;
    const headers = includeAuthorization ? this.addAuthorizationHeader() : undefined;
    return this.http.get<T>(fullUrl, { headers, params });
  }

  public download(url: string, includeAuthorization: boolean = false, params?: HttpParams) {
    const fullUrl = this.baseUrl + url;
    const headers = includeAuthorization ? this.addAuthorizationHeader() : undefined;
    return this.http.get(fullUrl, { headers, params, responseType: "blob" });
  }

  public post<T>(url: string, body: any, includeAuthorization: boolean = false): Observable<T> {
    const fullUrl = this.baseUrl + url;
    const headers = includeAuthorization ? this.addAuthorizationHeader() : undefined;
    return this.http.post<T>(fullUrl, body, {headers});
  }

  public put<T>(url: string, body: any, includeAuthorization: boolean = false): Observable<T> {
    const fullUrl = this.baseUrl + url;
    const headers = includeAuthorization ? this.addAuthorizationHeader() : undefined;
    return this.http.put<T>(fullUrl, body, {headers});
  }

  public delete<T>(url: string, includeAuthorization: boolean = false): Observable<T> {
    const fullUrl = this.baseUrl + url;
    const headers = includeAuthorization ? this.addAuthorizationHeader() : undefined;
    return this.http.delete<T>(fullUrl, {headers});
  }

  private addAuthorizationHeader(): HttpHeaders {
    const token = this.sessionStorageService.getToken()
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

}
