import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrismLib } from './prism-lib';

describe('PrismLib', () => {
  let component: PrismLib;
  let fixture: ComponentFixture<PrismLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrismLib]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrismLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
