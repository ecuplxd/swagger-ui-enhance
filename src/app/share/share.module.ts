import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import {
  StoreService,
  HightlightService,
  TypeService,
  CopyService,
  MenuPositionService,
  ProxyService,
  HistoryService,
  ScrollInoViewService,
} from './service';
import { DialogService } from './service/dialog/dialog.service';

import { CopyDirective, StopClickDirective } from './directives';
import {
  CopyComponent,
  HoverMenuComponent,
  SimpleTableComponent,
  EditorComponent,
} from './components';


const services = [
  StoreService,
  TypeService,
  HightlightService,
  CopyService,
  MenuPositionService,
  ProxyService,
  HistoryService,
  DialogService,
  ScrollInoViewService,
];

const directives = [
  CopyDirective,
  StopClickDirective,
];

const components = [
  CopyComponent,
  HoverMenuComponent,
  SimpleTableComponent,
  EditorComponent,
];

const matModules = [
  MatSidenavModule,
  MatToolbarModule,
  MatDividerModule,
  MatButtonModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatListModule,
  MatMenuModule,
  MatSlideToggleModule,
  ClipboardModule,
  MatSnackBarModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    ...directives,

    ...components,
  ],
  providers: [
    ...services,
  ],
  imports: [
    CommonModule,

    MatDividerModule,
    MatIconModule,
    ClipboardModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,

    ...matModules,

    ...directives,

    ...components,
  ],
})
export class ShareModule {}
