import { Clipboard } from '@angular/cdk/clipboard';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CopyService } from './copy.service';

class ClipboardStub {
  copy(): void {}
}

class MatSnackBarStub {
  open(): void {}
}

describe('CopyService', () => {
  let service: CopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Clipboard,
          useClass: ClipboardStub,
        },
        {
          provide: MatSnackBar,
          useClass: MatSnackBarStub,
        },
      ],
    });
    service = TestBed.inject(CopyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
