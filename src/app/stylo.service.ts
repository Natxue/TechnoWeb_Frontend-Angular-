import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stylo } from './stylo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StyloService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStylos(): Observable<Stylo[]>{
    return this.http.get<Stylo[]>(`${this.apiServerUrl}/stylo/all`);
  }

  public addStylo(stylo: Stylo): Observable<Stylo>{
    return this.http.post<Stylo>(`${this.apiServerUrl}/stylo/add`, stylo);
  }

  public updateStylos(stylo: Stylo): Observable<Stylo>{
    return this.http.put<Stylo>(`${this.apiServerUrl}/stylo/update`, stylo);
  }

  public deleteStylos(styloID: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/stylo/delete/${styloID}`);
  }

}
