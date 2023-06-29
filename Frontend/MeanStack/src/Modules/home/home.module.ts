import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedModule } from 'src/shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { DialogComponent } from '../dialog/dialog.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    DialogComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatTooltipModule,
    FormsModule,
    SharedModule
  ]
})
export class HomeModule { }
