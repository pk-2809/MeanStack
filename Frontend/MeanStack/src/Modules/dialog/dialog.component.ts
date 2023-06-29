import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { HttpService } from 'src/Utils/http.service';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
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
    private http: HttpService,
    private btmSht:MatBottomSheet
  ) { }


  ngOnInit(): void {
    this.info = this.data.info;
  }

  onEditItem()
  {
    let data = this.data;
    data['mode'] = 'EDIT';
    const config: MatBottomSheetConfig = {
      panelClass: 'custom-bottom-sheet',
      data: data
    };
    this.btmSht.open(BottomSheetComponent, config).afterDismissed().subscribe((res: any) => {
      if (res) {
        const endPoint = res.type === 'FOOD' ? 'comments' : 'restaurants';
        const req = {
          id: res.id,
          data:res.req
        };
        this.http.updateService(endPoint, req).subscribe((res: any) => {
          if (res.status)
          {
            this.dialogRef.close('edit');
            }
        }, error => {
          console.log('update error', error);
        })
      }
    })
  }

  onDeleteItem()
  {
    let data = this.data;
    data['mode'] = 'DELETE';
    const config: MatBottomSheetConfig = {
      panelClass: 'custom-bottom-sheet',
      data:data
    };
    this.btmSht.open(BottomSheetComponent, config).afterDismissed().subscribe((res: any) => {
      if (res !=undefined)
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
    });
  }
}
