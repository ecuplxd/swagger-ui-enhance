import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateService } from '../service';
import { CopyDirective } from './copy.directive';

@Component({
  selector: 'app-test-copy',
  template: `
    <div class="copy-this" *appCopy="!copyable">appCopy</div>

    <div class="copy-this" *appCopy="copyable; title: 'appCopyTitle'">
      appCopyTitle
    </div>

    <div class="copy-this" *appCopy="copyable; value: 'appCopyValue'">
      appCopyValue
    </div>

    <div class="copy-this" *appCopy="copyable; selector: 'copy-this'">
      appCopySelector
    </div>
  `,
})
class CopyComponent {
  copyable = true;
}

describe('CopyDirective', () => {
  let component: CopyComponent;
  let fixture: ComponentFixture<CopyComponent>;
  let des: DebugElement[] = [];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [CopyDirective, CopyComponent],
        providers: [
          TranslateService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(CopyDirective));
  });

  xit('should have four appCopy elements', () => {
    expect(des.length).toBe(4);
  });

  xit('should not append #CopyComponent if appCopy set false', () => {
    const appCopyFalseEl = des[0].nativeElement as HTMLDivElement;
    const resetEls = des.slice(1);
    resetEls.forEach((el: DebugElement) => {
      expect(el.nativeElement.childNodes.length).toBe(1);
    });
    expect(appCopyFalseEl.childNodes.length).toBe(1);
  });

  xit('should set title', () => {
    const dir = des[1].injector.get(CopyDirective) as CopyDirective;
    const el = des[1].nativeElement.querySelector('mat-icon');
    const title = el.getAttribute('title');
    expect(title).toBe(dir.appCopyTitle);
  });

  xit('should set value', () => {
    const dir = des[2].injector.get(CopyDirective) as CopyDirective;
  });

  xit('should clear child after ngOnDestroy', () => {});
});
