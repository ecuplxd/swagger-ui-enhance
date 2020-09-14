import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { ShareModule } from '../share/share.module';
import { ProjectModule } from '../project/project.module';

import { LayoutComponent } from './layout.component';
import { HeadComponent } from './head/head.component';
import { LogoComponent } from './head/logo/logo.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { RightNavComponent } from './right-nav/right-nav.component';
import { HeadRightComponent } from './head/head-right/head-right.component';
import { ApiModule } from '../api/api.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HeadComponent,
    LogoComponent,
    LeftNavComponent,
    RightNavComponent,
    HeadRightComponent,
  ],
  imports: [
    LayoutRoutingModule,
    ShareModule,
    ProjectModule,
    ApiModule,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class LayoutModule { }
