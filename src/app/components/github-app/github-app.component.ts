import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-github-app',
  templateUrl: './github-app.component.html',
  styleUrls: ['./github-app.component.css']
})
export class GithubAppComponent implements OnInit {

  public githubUserQuery!:string
  public githubProfile!: any;
  public githubRepos!: any[];
  public errorMessage!: string;

  constructor(private githubService: GithubService, private ngxSpinnerService:NgxSpinnerService) { }
  @ViewChild('f') formVal!: NgForm;


  public searchUser(){

    console.log(this.formVal);
    

    if (this.githubUserQuery === undefined || this.githubUserQuery === '')   {
      alert('please Enter a user Name')
    }

    // display the spinner before the Service Call 
    this.ngxSpinnerService.show();

    // get bithub user profile 
    this.githubService.getProfile(this.githubUserQuery).subscribe((data) =>{
      this.githubProfile = data;
    },(error) => {
      this.errorMessage = error;
    });

    this.githubService.getRepos(this.githubUserQuery).subscribe((data) => {
      this.githubRepos = data;
      // stop the spinner display 
      this.ngxSpinnerService.hide();
    }, (error) => {
      this.errorMessage = error;
    });

  }

  ngOnInit(): void {
  }

}
