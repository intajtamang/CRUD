import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgModel } from '@angular/forms'; // Import NgModel
import { Post, ProductObject } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  JSON: any;
  stringifyData(value: any) {
    throw new Error('Method not implemented.');
  }

  private apiURL = 'https://dummyjson.com';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // Fetch all posts
  getAll(skip: number = 0): Observable<ProductObject> {
    return this.httpClient.get<ProductObject>(`${this.apiURL}/products?skip=${skip}`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch a single post by ID
  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiURL}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new post
  create(post: NgModel): Observable<Post> { // Change parameter type to NgModel
    return this.httpClient.post<Post>(`${this.apiURL}/products/`, post.value, this.httpOptions).pipe( // Access value of NgModel
      catchError(this.handleError)
    );
  }

  // Update an existing post
  update(id: number, post: NgModel): Observable<Post> { // Change parameter type to NgModel
    return this.httpClient.put<Post>(
      `${this.apiURL}/products/${id}`,
      JSON.stringify(post.value), // Stringify the content of the NgModel
      this.httpOptions
    ).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a post by ID
  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Search for products by a search term
  searchProducts(searchTerm: string): Observable<ProductObject> {
    const url = `${this.apiURL}/products/search?q=${searchTerm}`;
    return this.httpClient.get<ProductObject>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
