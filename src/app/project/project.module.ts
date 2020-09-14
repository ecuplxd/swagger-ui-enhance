import { NgModule } from '@angular/core';

import { ShareModule } from '../share/share.module';
import { ApiModule } from '../api/api.module';

import { ProjectComponent } from './project.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ChooseProjectComponent } from './choose-project/choose-project.component';
import { ImportProjectComponent } from './import-project/import-project.component';
import { ProjectNamespacesComponent } from './project-namespaces/project-namespaces.component';



@NgModule({
  declarations: [
    ProjectComponent,
    ProjectInfoComponent,
    ChooseProjectComponent,
    ImportProjectComponent,
    ProjectNamespacesComponent,
  ],
  imports: [
    ShareModule,
    ApiModule,
  ],
  exports: [
    ProjectComponent,
    ImportProjectComponent,
  ]
})
export class ProjectModule { }
