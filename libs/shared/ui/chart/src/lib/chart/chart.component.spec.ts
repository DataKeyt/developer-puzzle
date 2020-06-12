import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { GoogleChartsModule } from 'angular-google-charts';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const mockData = [
    ['2016-12-29', 30.2],
    ['2016-12-30', 29.17],
    ['2017-01-03', 29.89],
    ['2017-01-04', 31.1],
    ['2017-01-05', 30.98],
    ['2017-01-06', 31.54],
    ['2017-01-09', 29.6],
    ['2017-01-10', 32.3]
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GoogleChartsModule],
      declarations: [ChartComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data$ = new Observable<any>();
    component.chartData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should update chartdata', () => {
    component.data$ = of(mockData);
    component.ngOnInit();
    expect(component.chartData).toEqual(mockData);
  });
});
