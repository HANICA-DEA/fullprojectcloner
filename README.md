# Fullprojectcloner
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.5.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Setup Instruction (We suggest that you create a new google account for this application)

## 1. Create a firestore database and 
To use a stand-alone database you can set one up at [Google Firebase](https://console.firebase.google.com/).


## 2. Create google scripts for the app to be able to send e-mails
Go to this [url](https://script.google.com) and login with any google account. 
Click on the + to create a new script and paste the content availible on this [page](https://pastebin.com/jD6RcFRH) as the script.
After that click on `Publish` and select `Implement as web-app...`
Enter any name (something like `InviteMailScript`). Make sure to set the access to this script to `Everyone, even anonymous users`.
Make sure that the web app has the right to send e-mails, because emails are sent from the account you are logged in with.
After you gave permission the `URL of the current web-app` will be showed. It is very important that you copy this url and paste it in the following file:
`fullprojectcloner/src/app/components/repositories/repository-invite/repository-invite.component.ts` on line `33` as `INVITEMAIL_SCRIPT_URL`.

The application should now be able to send an invite e-mail to a selected recipient in the application.

Create another script on this [url](https://script.google.com).
Click on the + to create a new script and paste the content availible on this [page](https://pastebin.com/5m85XYGv) as the script.
Change the `TO_ADDRESS` on line `1` to the e-mailadress that should receive the contact forms.
After that click on `Publish` and select `Implement as web-app...`
Enter any name (something like `ContactMailScript`). Make sure to set the access to this script to `Everyone, even anonymous users`.
Make sure that the web app has the right to send e-mails, because emails are sent from the account you are logged in with.
After you gave permission the `URL of the current web-app` will be showed. It is very important that you copy this url and paste it in the following file:
`fullprojectcloner/src/app/components/contact/contact.component.ts` on line `22` as `MAIL_SCRIPT_URL`.

The application should now be able to send contact form messages to the address filled in as `TO_ADDRESS`.

## 3. Deploy web app on GitHub pages
Run this command in the terminal to generate files that can run on GitHub pages:
`ng build --prod --output-path docs --base-href https://<user_name>.github.io`
When the build is complete, make a copy of `docs/index.html` and name it `docs/404.html`

Now login to GitHub and create a new repository.
When the setup repository page is viewed, click on `upload an existing file`.
In the following screen upload all the generated files that are in the docs folder.

When you have uploaded all the files. Go to the settings of the repository.
Scroll to the `GitHub Pages` tab and select `Master branch` when done click `Save`

In a few minutes your application will be availible at `https://<user_name>.github.io`

