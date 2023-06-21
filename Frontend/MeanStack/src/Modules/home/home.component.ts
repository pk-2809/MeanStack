import { Component, OnInit } from '@angular/core';
import { HomeForm } from './home.model';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/Utils/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  food!: HomeForm;
  foodList: HomeForm[] = [];

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.fetchExistingComments();
  }
  onSubmit(form:NgForm) {
      if (form.valid) {
        const foodName = form.value.foodName;
        const foodComment = form.value.foodComment;
        const req = {
          name: foodName.toUpperCase(),
          comment:foodComment
        }
        this.http.callService('comments', 'POST',req).subscribe((res: any) => {
          form.resetForm();
          this.fetchExistingComments();
        })
      }
  }
  fetchExistingComments()
  {
    this.http.callService('comments', 'GET').subscribe((res: any) => {
      console.log(res);
      if (res.status)
      {
        this.foodList = res.data;
        }
    })
  }


}
