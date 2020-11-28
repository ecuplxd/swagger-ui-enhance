import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CopyComponent,
  EditorComponent,
  HoverMenuComponent,
} from './components';
import {
  CopyDirective,
  DragDropDirective,
  StopClickDirective,
  TrDirective,
} from './directives';
import {
  CopyService,
  HistoryService,
  MenuPositionService,
  ProxyService,
  ScrollInoViewService,
  StoreService,
  TranslateService,
  TypeService,
} from './service';
import { DialogService } from './service/dialog/dialog.service';

const services = [
  StoreService,
  TypeService,
  CopyService,
  MenuPositionService,
  ProxyService,
  HistoryService,
  DialogService,
  ScrollInoViewService,
  TranslateService,
];

const directives = [
  CopyDirective,
  StopClickDirective,
  DragDropDirective,
  TrDirective,
];

const components = [CopyComponent, HoverMenuComponent, EditorComponent];

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
  MatTooltipModule,
];

@NgModule({
  declarations: [...directives, ...components],
  providers: [
    // ...services,
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
