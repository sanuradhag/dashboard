import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchTerm } from './app-search-term.component';

describe('AppSearchTerm', () => {
  let component: AppSearchTerm;
  let fixture: ComponentFixture<AppSearchTerm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSearchTerm ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSearchTerm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
