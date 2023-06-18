import { Component, OnInit } from '@angular/core';
import { HomeForm } from './home.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  food!: HomeForm;


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm) {
      if (form.valid) {
        const foodName = form.value.foodName;
        const foodComment = form.value.foodComment;
        console.log('Food Name:', foodName);
        console.log('Food Comment:', foodComment);
        form.resetForm();
      }
  }

}
