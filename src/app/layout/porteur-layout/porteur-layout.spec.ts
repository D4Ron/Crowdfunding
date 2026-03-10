import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteurLayout } from './porteur-layout';

describe('PorteurLayout', () => {
  let component: PorteurLayout;
  let fixture: ComponentFixture<PorteurLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorteurLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorteurLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
