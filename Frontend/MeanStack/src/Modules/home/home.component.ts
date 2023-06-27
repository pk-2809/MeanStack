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
  foodImage: File | undefined;
  restaurantImage: File | undefined;
  foodList: HomeForm[] = [];
  restList: any[] = [];

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.fetchExistingComments();
    this.fetchExistingRestaurants();
  }
  onSubmit(form:NgForm) {
      if (form.valid) {
        const foodName = form.value.foodName;
        const foodComment = form.value.foodComment;
        if (this.foodImage != null && this.foodImage != undefined)
        {

          const req = new FormData();
          req.append('foodName', foodName.toUpperCase());
          req.append('comment', foodComment);
          req.append('file', this.foodImage);
          this.http.callService('comments', 'POST',req).subscribe((res: any) => {
            form.resetForm();
            this.fetchExistingComments();
          })
        }
        else
        {
          console.log('File not found');
          }

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
  onFoodImageUpload(event:Event) {
    const file = (event.target as HTMLInputElement).files;
    if(file != null)
    {
      this.foodImage = file[0];
    }

  }
  onRestImageUpload(event:Event) {
    const file = (event.target as HTMLInputElement).files;
    if(file != null)
    {
      this.restaurantImage = file[0];
    }
  }

  fetchExistingRestaurants()
  {
    this.http.callService('restaurants', 'GET').subscribe((res: any) => {
      console.log(res);
      if (res.status)
      {
        this.restList = res.data;
        }
    })
  }

  addRestaurant(form:NgForm)
  {
    if (form.valid) {
      const restName = form.value.restName;
      const restRating = form.value.restRating;
      if (this.restaurantImage != null && this.restaurantImage != undefined)
      {
        const req = new FormData();
          req.append('restName', restName.toUpperCase());
          req.append('restRating', restRating);
          req.append('file', this.restaurantImage);
        this.http.callService('restaurants', 'POST',req).subscribe((res: any) => {
          form.resetForm();
          this.fetchExistingRestaurants();
        })
      }
      else
        {
          console.log('File not found');
          }
    }
  }

}
