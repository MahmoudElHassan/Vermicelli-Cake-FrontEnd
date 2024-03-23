import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'Products/GetProductById/11').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + 'Buggy/servererror').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + 'Buggy/badrequest').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
    });
  }

  get400ValidationError(){
    this.http.get(this.baseUrl + 'Products/GetProductById/fourtytwo').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error)
      this.validationErrors = error.errors;
    });
  }
}
