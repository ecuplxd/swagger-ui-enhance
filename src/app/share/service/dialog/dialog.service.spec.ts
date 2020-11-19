import { HttpClient } from '@angular/common/http';
import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ApiRequestDialogComponent } from 'src/app/api/api-request/api-request-dialog/api-request-dialog.component';
import { ApiItem } from 'src/app/api/api.model';
import { ApiModule } from 'src/app/api/api.module';
import { hasClass } from 'src/__test__';
import { Any } from '../../share.model';
import { ShareModule } from '../../share.module';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  const openDialog = () => {
    const apiItem = ({
      parameters: [],
      responses: {},
      __info: {
        url: '/api/v1/user',
        method: 'get',
      },
    } as Any) as ApiItem;
    service.openRequestDialog(apiItem);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ShareModule, FormsModule, ApiModule],
      declarations: [ApiRequestDialogComponent],
      providers: [MatDialog, HttpClient],
    });
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set dialog size base on window width/height', () => {
    expect(service.getDialogSize()).toEqual({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  it('should open request dialog', () => {
    const html = document.querySelector('html') as HTMLElement;

    expect(hasClass(html, 'hidden-y')).toBe(false, 'before open dialog');

    openDialog();

    expect(hasClass(html, 'hidden-y')).toBe(true, 'open dialog');
  });

  it('should resize dialog size when window resize', fakeAsync(() => {
    openDialog();

    spyOn(service.dialogRef, 'updateSize');

    window.dispatchEvent(new Event('resize'));

    tick(250);

    expect(service.dialogRef.updateSize).toHaveBeenCalled();

    flush();
  }));

  it('should close dialog remove html hidden-y className', () => {
    openDialog();

    spyOn(service.dialogRef, 'afterClosed').and.returnValue(of({}));

    service.listenCloseDialog();

    const html = document.querySelector('html') as HTMLElement;

    expect(hasClass(html, 'hidden-y')).toBe(false, 'after close opened dialog');
  });
});
