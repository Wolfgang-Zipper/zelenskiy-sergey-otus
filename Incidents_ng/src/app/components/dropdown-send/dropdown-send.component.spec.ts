import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSendComponent } from './dropdown-send.component';

describe('DropdownSendComponent', () => {
  let component: DropdownSendComponent;
  let fixture: ComponentFixture<DropdownSendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownSendComponent]
    });
    fixture = TestBed.createComponent(DropdownSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
