import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { endpoints } from '../env';
import { IUser } from 'src/Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(user: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${endpoints.apiUrl}/siku`, user, { observe: 'response' });
  }

  getAll(): Observable<HttpResponse<IUser[]>> {
    return this.http.get<IUser[]>(`${endpoints.apiUrl}/siku/`, { observe: 'response' });
  }
}
