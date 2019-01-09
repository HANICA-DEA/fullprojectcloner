import {SidemenuComponent} from './sidemenu.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidemenuComponent,
      ]
    });
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
  }));
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('empty test', () => {
    component.ngOnInit();
    const currentYear = new Date().getFullYear();
    expect(component.currentYear).toEqual(currentYear);
  });
});

