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
  let snackBar: MatSnackBar;
  let clipboard: Clipboard;

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
    snackBar = TestBed.inject(MatSnackBar);
    clipboard = TestBed.inject(Clipboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #copy() do nothing if no value', () => {
    spyOn(clipboard, 'copy');
    service.copy('');

    expect(clipboard.copy).not.toHaveBeenCalled();
  });

  it('should #copy() text', () => {
    spyOn(clipboard, 'copy');

    service.copy('copy', false);

    expect(clipboard.copy).toHaveBeenCalledWith('copy');
  });

  it('should #copy() text by selector', () => {
    spyOn(clipboard, 'copy');

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="copy">copy1<br/>fffff</div>
    <div class="copy">copy2</div>
    <div class="copy">copy3 <span>content_copy</span></div>
    `;
    document.body.appendChild(div);

    service.copy('copy', true);

    expect(clipboard.copy).toHaveBeenCalledWith('copy1fffff, copy2, copy3 ');

    document.body.removeChild(div);
  });
});
