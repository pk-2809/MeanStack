import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HomeForm } from './home.model';
import { RestForm } from './home.model';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/Utils/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
export interface DialogObj{
  name: string,
  desc: string,
  image:string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

@ViewChild("myDialog")
export class HomeComponent implements OnInit {

  food!: HomeForm;
  foodImage: File | undefined;
  restaurantImage: File | undefined;
  foodList: HomeForm[] = [];
  restList: any[] = [];
  dialogObj: DialogObj | undefined;


  constructor(private http:HttpService, private dialog:MatDialog) { }

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
          req.append('imagePath', this.foodImage);
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
    this.http.callService<HomeForm>('comments', 'GET').subscribe((res: any) => {
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
    this.http.callService<RestForm>('restaurants', 'GET').subscribe((res: any) => {
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
          req.append('imagePath', this.restaurantImage);
        this.http.callService<RestForm>('restaurants', 'POST',req).subscribe((res: any) => {
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

  onFoodSelect(item: HomeForm)
  {
    this.dialogObj = {
      name: item.foodName,
      desc: item.comment,
      image:item.imagePath
    }
    this.dialog.open(DialogComponent, {
      data: {
        data: this.dialogObj,
        type: 'FOOD',
        info:item
      }
    }).afterClosed().subscribe(res => {
      if (res === 'delete' || res === 'edit')
      {
        this.fetchExistingComments();
        }
    });;
  }

  onRestroSelect(item: RestForm)
  {
    this.dialogObj = {
      name: item.restName,
      desc: item.restRating,
      image:item.imagePath
    }
    this.dialog.open(DialogComponent, {
      data: {
        data: this.dialogObj,
        type: 'REST',
        info:item
      }
    }).afterClosed().subscribe(res => {
      if (res === 'delete' || res === 'edit')
      {
        this.fetchExistingRestaurants();
        }
    });
  }

}
