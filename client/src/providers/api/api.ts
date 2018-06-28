import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class ApiProvider {

  BASE_URL = 'http://ec2-18-188-15-69.us-east-2.compute.amazonaws.com:3113';

  constructor(public http: HttpClient) {}

  uploadPicture$ = (data,type):Observable<any> => this.http.post(this.BASE_URL+'/upload',{data,type})

}
