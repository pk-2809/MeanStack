import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HttpService } from 'src/Utils/http.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  info: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http:HttpService
  ) { }


  ngOnInit(): void {
    this.info = this.data.info;
    console.log(this.data);
  }

  onDeleteItem()
  {
    const endPoint = this.data.type === 'FOOD' ? 'comments' : 'restaurants';
    this.http.deleteService(endPoint, this.info._id).subscribe((res:any) => {
      if (res.status)
      {
        this.dialogRef.close('delete');
        }
    }, error => {
      console.log('delete error', error);
    })
  }
}
