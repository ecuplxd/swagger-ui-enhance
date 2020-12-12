import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/share/share.module';
import { ApiAuthComponent } from './api-auth/api-auth.component';
import { ApiInfoComponent } from './api-info/api-info.component';
import { ApiListComponent } from './api-list/api-list.component';
import { ApiMethodComponent } from './api-method/api-method.component';
import { ApiParameterComponent } from './api-parameter/api-parameter.component';
import { ApiRequestDialogComponent } from './api-request/api-request-dialog/api-request-dialog.component';
import { ApiRequestHistoryComponent } from './api-request/api-request-history/api-request-history.component';
import { ApiRequestComponent } from './api-request/api-request.component';
import { ApiResponseComponent } from './api-response/api-response.component';
import { ApiRoutingModule } from './api-routing.module';
import { ApiSearchResultComponent } from './api-search/api-search-result/api-search-result.component';
import { ApiSearchComponent } from './api-search/api-search.component';
import { ApiSummaryComponent } from './api-summary/api-summary.component';
import { ApiTocComponent } from './api-toc/api-toc.component';
import { ApiTypeHoverComponent } from './api-type-hover/api-type-hover.component';
import { ApiTypeComponent } from './api-type/api-type.component';
import { ApiComponent } from './api.component';

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
    ApiSearchResultComponent,
    ApiRequestHistoryComponent,
    ApiAuthComponent,
  ],
  imports: [ShareModule, ApiRoutingModule],
  exports: [ApiSummaryComponent, ApiSearchComponent, ApiTocComponent],
})
export class ApiModule {}
