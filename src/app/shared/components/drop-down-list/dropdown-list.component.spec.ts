import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownListComponent } from './dropdown-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';


describe('DropDownListComponent', () => {
    let component: DropdownListComponent;
    let fixture: ComponentFixture<DropdownListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DropdownListComponent],
            providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DropdownListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
