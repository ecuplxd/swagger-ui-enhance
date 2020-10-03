import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CopyService } from '../../service';

import { CopyComponent } from './copy.component';

class CopyServiceStub {
  copy(): void {}
}

describe('CopyComponent', () => {
  let component: CopyComponent;
  let fixture: ComponentFixture<CopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CopyComponent],
      providers: [
        {
          provide: CopyService,
          useClass: CopyServiceStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
