import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreRecommendationsComponent } from './genre-recommendations.component';

describe('GenreRecommendationsComponent', () => {
  let component: GenreRecommendationsComponent;
  let fixture: ComponentFixture<GenreRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
