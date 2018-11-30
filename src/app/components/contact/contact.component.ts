import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Headers, Http} from '@angular/http';
import {ContactFormDto} from '../../services/dto/contactform.dto';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {

  private contactFormDto: ContactFormDto;
  contactForm: FormGroup;
  submitted = false;
  MAIL_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrBysjuMbBGdWRyaOXpW2PwkavvyLePxSmQeJC5CdAQEHS3ys/exec';

  constructor(private formBuilder: FormBuilder, private http: Http) {
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

      const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      this.http.post(this.MAIL_SCRIPT_URL, this.contactFormDto, {headers: headers})
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  ngOnInit() {
  }

}
