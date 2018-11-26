import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ContactFormDto} from '../../services/dto/contactform.dto';

const headers = new HttpHeaders()
  .set('Content-Type', 'undefined')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'POST')
  .set('Access-Control-Allow-Headers', 'Content-type')
  .set('Access-Control-Allow-Credentials', 'true');

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {

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
        this.contactFormDto,
        {headers}
      ).subscribe(data => {
        console.log('Mail has been sent' + data);
      }, error => {
        console.log('Mail has not been sent ' + error);
      });

      console.log(
        'fullName: ' + this.contactForm.controls.fullName.value +
        ' email: ' + this.contactForm.controls.email.value +
        ' message: ' + this.contactForm.controls.message.value);
    }
  }

  ngOnInit() {
  }

}
