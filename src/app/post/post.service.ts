import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = 'https://dummyjson.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Define getPosts as a method to fetch posts
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/products/')
    .pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  getAll(skip:number=0): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/products?skip=${skip}`)
    .pipe(catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/products/', JSON.stringify(post), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL + '/products/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  update(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + '/products/' + id, JSON.stringify(post), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiURL + '/products/' + id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
