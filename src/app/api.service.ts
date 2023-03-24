import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getdata(path:string){
  return this.http.get(path);
}

postRecord(data: any) {
  return this.http.post<any>("http://localhost:3000/posts/", data);
}

getRecord(path: string) {
  return this.http.get<any>(path);
}

deleteRecord(path:any){
  return this.http.delete(path);
}
}
