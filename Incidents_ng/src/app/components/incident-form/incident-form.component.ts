import { Component } from '@angular/core';
import { banks } from '../../services/template/gateway-temlate';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss'],
})
export class IncidentFormComponent {
  bankCodeError: string = '';
  dateTime: string = this.getCurrentDateTime();
  selectedIncident: string = '';
  bankNameError: string = '';
  lkType: string = '';
  bankTruble: string = '';
  banks: string[] = banks;

  incidentsForm = new FormGroup({
    bankCodeError: new FormControl('', Validators.required),
    dateTime: new FormControl(this.getCurrentDateTime(), Validators.required),
    bankTruble: new FormControl('', Validators.required),
    lkType: new FormControl('', Validators.required),
    bankNameError: new FormControl('', Validators.required),
  });

  gatewayIssueChange(event: any) {
    //выбор шаблона "Проблема с"
    this.selectedIncident = (event.target as HTMLInputElement).value;
  }

  constructor() {
    this.incidentsForm.valueChanges.subscribe(
      ({ lkType, bankCodeError, bankNameError, bankTruble, dateTime }) => {
        this.lkType = lkType ?? '';
        this.dateTime = dateTime ?? '';
        this.bankCodeError = bankCodeError ?? '';
        this.bankNameError = bankNameError ?? '';
        this.bankTruble = bankTruble ?? '';
      },
    );
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.pad(now.getMonth() + 1); // месяцы начинаются с 0
    const day = this.pad(now.getDate());
    const hours = this.pad(now.getHours());
    const minutes = this.pad(now.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  pad(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }
}
