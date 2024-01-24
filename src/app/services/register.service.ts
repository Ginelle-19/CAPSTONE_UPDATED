import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8085'; // Replace with your actual backend API URL

  constructor(private http: HttpClient, private dataService: DataService) {}

  register(UserName: string, Password: string): Observable<any> {
    const newUser = { UserName: UserName, Password: Password };
  
    // Make an HTTP post request to register the new user
    return this.http.post(`${this.apiUrl}/api/users/register`, newUser).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        console.log('Server response:', error.error); // Log the actual response received from the server
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}