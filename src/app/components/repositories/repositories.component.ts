import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {AuthService} from '../../services/auth/auth.service';
import {DatabaseService} from '../../services/share/database.service';
import {AuthdataDto} from '../../services/dto/authdata.dto';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.sass']
})
export class RepositoriesComponent implements OnInit {

  repositories: Object;
  authData: AuthdataDto;

  //loggedin: boolean;


  constructor(private data: DataService, public authService: AuthService, private dbService: DatabaseService) {
  }


  // async delay(ms: number) {
  //   await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  //   this.dbService.getFromDatabase('user', this.authService.userDetails.uid);
  //   console.log(this.dbService.getFromDatabase('user', this.authService.userDetails.uid) + ' 2');
  // }

  ngOnInit() {


    this.authService.user.subscribe(auth => {
      if (auth) {
        console.log(this.authService.userDetails.uid + ' 1');

        (async () => {
          this.authData = await this.dbService.getData('user', this.authService.userDetails.uid);
          // this.dbService.getFromDatabase('user', this.authService.userDetails.uid).subscribe(data => {
          //   this.repositories = data;
          // });
          console.log(this.authData._username + ' 2');


          //console.log(this.data.getrepositories(this.authData.token, this.authData.username) + ' 3');

          this.repositories = await this.data.getrepositories(this.authData.token, this.authData.username);

          console.log(this.repositories + ' 3');
          // this.data.getrepositories(this.authData.token, this.authData.username).subscribe(data => {
          //   this.repositories = data;
          // });
        })
      }
    });
  }
}


// ngOnInit() {
//   this.getSomething().subscribe(data => { if(this.dbService.getFromDatabase('user', this.authService.userDetails.uid) != null) {
//     this.data.getrepositories(this.authService.token, this.authService.username)
//   }});
//   }
//
//   getSomething(){
//    console.log(this.dbService.getFromDatabase('user', this.authService.userDetails.uid));
//      return this.dbService.getFromDatabase('user', this.authService.userDetails.uid).pipe(
//        map((data => {
//          this.authData = data
//        })));
// }
