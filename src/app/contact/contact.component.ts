import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ContactFormDto} from '../services/dto/contactform.dto';

// const headers = new Headers({
//   'Accept': 'application/json',
//   'enctype': 'multipart/form-data'
// })
//   // .set('Content-Type', 'undefined')
//   // .set('Access-Control-Allow-Origin', '*')
//   // .set('Access-Control-Allow-Methods', 'POST')
//   // .set('Access-Control-Allow-Headers', 'Content-type')
//   // .set('Access-Control-Allow-Credentials', 'true');


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})


export class ContactComponent implements OnInit {

  headers = new Headers({'Content-Type': 'application/json;charset=utf-8'});

  contactForm: FormGroup;
  submitted = false;


  MAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrBysjuMbBGdWRyaOXpW2PwkavvyLePxSmQeJC5CdAQEHS3ys/exec';

  private contactFormDto: ContactFormDto;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }


  onSubmit() {


    // let body = JSON.stringify('hello');
    //
    // let url = 'https://script.google.com/macros/s/AKfycbxrBysjuMbBGdWRyaOXpW2PwkavvyLePxSmQeJC5CdAQEHS3ys/exec';
    //
    // this.http.post(url, body).subscribe(data => {
    //       console.log('Mail has been sent' + data);
    //     }, error => {
    //       console.log('Mail has not been sent ' + error);
    //     });


    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    if (this.contactForm.valid) {
      this.contactFormDto = new ContactFormDto(
        this.contactForm.controls.fullName.value,
        this.contactForm.controls.email.value,
        this.contactForm.controls.message.value
      );


      this.http.post(
        this.MAIL_SCRIPT_URL,
        JSON.stringify("hello")).subscribe(data => {
        console.log('Mail has been sent' + data);
      }, error => {
        console.log('Mail has not been sent ' + error);
      });
    }
  }


  //
  // console.log(
  //   'fullName: ' + this.contactForm.controls.fullName.value +
  //   ' email: ' + this.contactForm.controls.email.value +
  //   ' message: ' + this.contactForm.controls.message.value);

  ngOnInit() {
  }

}
