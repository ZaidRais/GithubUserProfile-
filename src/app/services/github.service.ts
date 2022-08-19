import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, count, Observable, retry, throwError } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GithubCred';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient:HttpClient) { }

  // for github profile 
  public getProfile(searchQuery: any):Observable<any>{
    let dataURl = `https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  
    return this.httpClient.get<any>(dataURl).pipe(
      retry(1 ),
      catchError(this.handleErrors)
    );
    }

    // for github repos 
  public getRepos(searchQuery: any):Observable<any[]>{
    let dataURl = `https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  
    return this.httpClient.get<any[]>(dataURl).pipe(
      retry(1 ),
      catchError(this.handleErrors)
    );
  }

  public handleErrors(error: HttpErrorResponse){
      let errorMessage:string;
      if (error.error instanceof ErrorEvent ) {
        // client side error 
        errorMessage = `MESSAGE: ${error.error.message}`;
      }
      else{
        // Server side Error 
        errorMessage = `STATUS : ${error.status} MESSAGE : ${error.message}`;
      }
      return throwError(errorMessage);

  }
  

}
