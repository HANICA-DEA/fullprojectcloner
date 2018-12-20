// import {RepositoryPickerComponent} from './repository-picker.component';
// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {GithubService} from '../../../services/github/github.service';
//
//
// describe('RepositoryPickerComponent', () => {
//   let component = RepositoryPickerComponent;
//   let fixture: ComponentFixture<RepositoryPickerComponent>;
//
//   const githubService: GithubService;
//   // const templates: Template[] = [];
//
//
//   // beforeEach(async(() => {
//   //   TestBed.configureTestingModule({
//   //     declarations: [RepositoryPickerComponent]
//   //   });
//   //
//   //   fixture = TestBed.createComponent(RepositoryPickerComponent);
//   //   component = [fixture.componentInstance],
//   //     providers: [
//   //     LoggingService,
//   //     SheetService,
//   //     TemplateRepository
//   //   ]
//   // }));
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         fixture.componentInstance
//       ],
//       providers: [
//         GithubService
//       ]
//     })
//       .compileComponents();
//   }));
//
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(RepositoryPickerComponent);
//     component = fixture.componentInstance;
//
//     sheetService = TestBed.get(SheetService);
//
//     this.templates = [new Template(), new Template()];
//
//     spyOn(sheetService, 'getTemplates')
//       .and.returnValue(Promise.resolve(templates));
//   });
//
//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should have the templates set after component is initialized', fakeAsync(() => {
//     fixture.detectChanges();
//     tick();
//     fixture.detectChanges();
//     expect(component.templates).toBe(templates);
//   }));
// });
