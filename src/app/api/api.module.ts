import { NgModule } from '@angular/core';

import { ShareModule } from 'src/app/share/share.module';

import { ApiComponent } from './api.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiInfoComponent } from './api-info/api-info.component';
import { ApiSummaryComponent } from './api-summary/api-summary.component';
import { ApiResponseComponent } from './api-response/api-response.component';
import { ApiParameterComponent } from './api-parameter/api-parameter.component';
import { ApiSearchComponent } from './api-search/api-search.component';
import { ApiTocComponent } from './api-toc/api-toc.component';
import { ApiTypeComponent } from './api-type/api-type.component';
import { ApiTypeHoverComponent } from './api-type-hover/api-type-hover.component';
import { ApiMethodComponent } from './api-method/api-method.component';
import { ApiRequestComponent } from './api-request/api-request.component';
import { ApiRequestDialogComponent } from './api-request/api-request-dialog/api-request-dialog.component';
import { ApiRoutingModule } from './api-routing.module';



@NgModule({
  declarations: [
    ApiComponent,
    ApiListComponent,
    ApiInfoComponent,
    ApiSummaryComponent,
    ApiResponseComponent,
    ApiParameterComponent,
    ApiSearchComponent,
    ApiTocComponent,
    ApiTypeComponent,
    ApiTypeHoverComponent,
    ApiMethodComponent,
    ApiRequestComponent,
    ApiRequestDialogComponent,
  ],
  imports: [
    ShareModule,
    ApiRoutingModule,
  ],
  exports: [
    ApiSummaryComponent,
    ApiSearchComponent,
    ApiTocComponent,
  ],
})
export class ApiModule { }
