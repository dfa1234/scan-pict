import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApiProvider {

  BASE_URL = 'http://apps.wf:3113';

  constructor(public http: HttpClient) {}

  uploadPicture$ = (data,type):Observable<any> => this.http.post(this.BASE_URL+'/upload',{data,type})

}
