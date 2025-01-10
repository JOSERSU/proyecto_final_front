import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review, Reviews } from '../data/reviews';


@Injectable({
  providedIn: 'root'
})
export class ReviewsServiceService {


  urlApi = "http://localhost:8080/api/v1/reviews"
  private username = "admin"; // Reemplaza con tu usuario
  private password = "admin1234"; // Reemplaza con tu contraseña

  constructor(private httpCliente: HttpClient) { }



  private createAuthHeaders(): HttpHeaders {
    const auth = btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.httpCliente.post(`${this.urlApi}/login`, { username, password }, {
      headers: this.createAuthHeaders()
    });
  }

  // GET
  getAllReviews(): Observable<Reviews> {
    return this.httpCliente.get<Reviews>(this.urlApi, {
      headers: this.createAuthHeaders()
    });
  }

  // GET ID
  getReview(id: number): Observable<Review> {
    return this.httpCliente.get<Review>(`${this.urlApi}/${id}`, {
      headers: this.createAuthHeaders()
    });
  }

  // POST
  postReview(review: any): Observable<Review> {
    return this.httpCliente.post<Review>(this.urlApi, review, {
      headers: this.createAuthHeaders()
    });
  }

  // PUT
  putReview(id: number, review: Review): Observable<Review> {
    return this.httpCliente.put<Review>(`${this.urlApi}/${id}`, review, {
      headers: this.createAuthHeaders()
    });
  }

  // DELETE
  deleteReview(id: number): Observable<Review> {
    return this.httpCliente.delete<Review>(`${this.urlApi}/${id}`, {
      headers: this.createAuthHeaders()
    });
  }
}
