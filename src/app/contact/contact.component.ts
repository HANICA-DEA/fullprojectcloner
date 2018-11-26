import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Headers, Http} from '@angular/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;

  MAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrBysjuMbBGdWRyaOXpW2PwkavvyLePxSmQeJC5CdAQEHS3ys/exec';

  private body: string;

  constructor(private formBuilder: FormBuilder, private http: Http) {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {


    this.submitted = true;

    this.body = '&name=' + this.contactForm.controls.fullName.value + '&email=' +
      this.contactForm.controls.email.value + '&message=' + this.contactForm.controls.message.value;

    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.MAIL_SCRIPT_URL, this.body, {headers: headers})
      .subscribe((response) => {
        console.log(response);
      });
    }

  ngOnInit() {
  }

}
