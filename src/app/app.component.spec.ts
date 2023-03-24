import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from "./components/header/header.component";
import {ToastModule} from "primeng/toast";
import {MenubarModule} from "primeng/menubar";
import {DataSourceModule} from "./data-source/data-source.module";
import {MessageService} from "primeng/api";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastModule,
        MenubarModule,
        DataSourceModule
      ],
      declarations: [
        HeaderComponent,
      ],
      providers: [
        MessageService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Odeon'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Odeon');
  });
});
