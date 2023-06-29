import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  type: string | undefined;
  mode: string | undefined;
  info: any;
  name: string = '';
  desc: string = '';
  file: any = {};


  constructor(
    public btmShtRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.name = '';
    this.desc = '';
    this.file = {};
    if (this.data && this.data.info && this.data.type)
    {
      this.type = this.data.type;
      this.mode = this.data.mode;
      this.info = this.data.info;
      }
  }

  ngOnInit(): void {

    this.file['name'] = this.info.imagePath.split('images/')[1];

    if (this.mode === 'EDIT')
    {
      if (this.type === 'FOOD')
      {
        this.name = this.info.foodName;
        this.desc = this.info.comment;
      }
      else if (this.type === 'REST')
      {
        this.name = this.info.restName;
        this.desc = this.info.restRating;
      }
      }
  }

  onEditItem()
  {
    let req = this.info;
    if (this.file['type'] != undefined)
    {
      const newReq = new FormData();
      newReq.append('imagePath', this.file);
      newReq.append('_id', this.info._id);
      if (this.type === 'FOOD')
      {
        newReq.append('foodName', this.name);
        newReq.append('comment', this.desc);
      }
      else if (this.type === 'REST')
      {
        newReq.append('restName', this.name);
        newReq.append('restRating', this.desc);
      }
      req = newReq;
    }
    else
    {
      if (this.type === 'FOOD')
      {
        req.foodName = this.name;
      req.comment = this.desc;
      }
      else if (this.type === 'REST')
      {
        req.restName = this.name;
        req.restRating = this.desc;
    }
      }
    this.btmShtRef.dismiss({
      id: this.info._id,
      req: req,
      type: this.type,
      mode:this.mode
    })
  }
  onRemoveFile()
  {
    this.file = {};
    this.file['name'] = '';
  }
  onUploadFile(event:Event)
  {
    const file: any = (event.target as HTMLInputElement).files;
    console.log(file)
    this.file = file[0];
  }

}
