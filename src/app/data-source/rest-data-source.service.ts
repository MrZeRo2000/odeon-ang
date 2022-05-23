import {Inject, Injectable, InjectionToken} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

export const REST_URL = new InjectionToken<string>('rest-url');
export const REST_URL_ENV = {provide: REST_URL, useValue: environment.restUrl}

@Injectable({
  providedIn: 'root'
})
export class RestDataSourceService {

  constructor(private http: HttpClient, @Inject(REST_URL) private restUrl: string) { }

  getResponseData<T>(resourceName: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.restUrl + resourceName);
  }

  getResponse<T>(resourceName: string, params?: HttpParams): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.restUrl + resourceName, { observe: 'response', params });
  }

  postResponse<T>(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<HttpResponse<T>> {
    return this.http.post<T>(this.restUrl + resourceName, body, { headers, observe: 'response', params: httpParams });
  }

  postResponseData<T>(resourceName: string, body: any, httpParams?: HttpParams, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.restUrl + resourceName, body);
  }
}
