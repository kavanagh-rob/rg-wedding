import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingSiteComponent } from './wedding-site.component';

describe('WeddingSiteComponent', () => {
  let component: WeddingSiteComponent;
  let fixture: ComponentFixture<WeddingSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
