import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFeedComponent } from './report-feed.component';

describe('ReportFeedComponent', () => {
  let component: ReportFeedComponent;
  let fixture: ComponentFixture<ReportFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
