import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerCampagneComponent } from './creer-campagne';

describe('CreerCampagne', () => {
  let component: CreerCampagneComponent;
  let fixture: ComponentFixture<CreerCampagneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerCampagneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
