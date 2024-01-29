import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  inject,
} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api-service/api-service.service';
import { IncidentTemplateService } from '../../services/template/incidents-template.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dropdown-send',
  template: `
    <div class="modal-header">
      <mat-icon class="material-icons color_orange">warning</mat-icon>
      <h4 class="modal-title">Новое сообщение в incidents_info</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body modal_modal-body">
      <textarea
        class="form-control"
        [(ngModel)]="incedentMessage"
        name="incedentMessage"
        rows="5"
      ></textarea>

      {{ data }}
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Отмена
      </button>
      <button class="btn btn btn-outline-primary" (click)="postIncedents()">
        Отправить в incidents_info
      </button>
    </div>
  `,
  styleUrls: ['./dropdown-send.component.scss'],
})
export class NgbdModal1Content {
  @Input() incedentMessage: any;
  private modalService = inject(NgbModal);
  activeModal = inject(NgbActiveModal);
  data: any;
  message: string;

  constructor(private apiService: ApiService) {}

  openenModalSucess() {
    const modalRef = this.modalService.open(NgbdModal2Content, { size: 'md' });

    modalRef.componentInstance.message = this.message;
  }
  openModalError() {
    const modalRef = this.modalService.open(NgbdModal3Content, { size: 'md' });

    modalRef.componentInstance.message = this.message;
  }
  openModalWarn() {
    const modalRef = this.modalService.open(NgbdModal4Content, { size: 'md' });

    modalRef.componentInstance.message = this.message;
  }

  postIncedents() {
    this.apiService
      .sendIncident('', this.incedentMessage)
      .subscribe((response: any) => {
        this.data = response.data;
        console.log(response);

        if (response.id) {
          console.log(response);
        }
        if (response.sentToTelegram && response.sentToTime) {
          this.message = 'Инцидент отправлен в Telegram и в Time';
          this.openenModalSucess();
        } else if (response.sentToTelegram) {
          this.message = 'Инцидент отправлен только в Telegram';
          this.openModalWarn();
        } else if (response.sentToTime) {
          this.message = 'Инцидент отправлен только в Time';
          this.openModalWarn();
        } else {
          this.message = 'Ошибка при отправке инцидента';
          this.openModalError();
        }
      });
  }
}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body modal_modal-body">
      <mat-icon class="material-icons color_green">done</mat-icon>
      <h4 class="modal-title">{{ message }}</h4>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
  styleUrls: ['./dropdown-send.component.scss'],
})
export class NgbdModal2Content {
  activeModal = inject(NgbActiveModal);
  @Input() message: string;
}
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body modal_modal-body">
      <mat-icon class="material-icons color_red">error</mat-icon>
      <h4 class="modal-title">{{ message }}</h4>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
  styleUrls: ['./dropdown-send.component.scss'],
})
export class NgbdModal3Content {
  activeModal = inject(NgbActiveModal);
  @Input() message: string;
}
@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title"></h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body modal_modal-body">
      <mat-icon class="material-icons color_orange">warning</mat-icon>
      <h4 class="modal-title">{{ message }}</h4>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-dark"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
  styleUrls: ['./dropdown-send.component.scss'],
})
export class NgbdModal4Content {
  activeModal = inject(NgbActiveModal);
  @Input() message: string;
}

@Component({
  selector: 'dropdown-send',
  templateUrl: './dropdown-send.component.html',
})
export class DropdownSendComponent {
  messageTemplate: any;
  incedentMessage: any;
  filledMessageTemplate: any = '';
  @Input() bankCodeError: string = '';
  @Input() dateTime: string = '';
  @Input() selectedIncident: string = '';
  @Input() bankNameError: string = '';
  @Input() lkType: string = '';
  @Input() bankTruble: string = '';
  inputValid: any = '';
  @Output() submitEvent = new EventEmitter();
  @Input() incidentsForm: any = '';

  private modalService = inject(NgbModal);
  modalsNumber = 0;

  constructor(private messageTemplateService: IncidentTemplateService) {
    this.modalService.activeInstances
      .pipe(takeUntilDestroyed())
      .subscribe((list) => {
        this.modalsNumber = list.length;
      });
  }
  updateIncedentMessageTemplate() {
    this.messageTemplate = this.messageTemplateService.getTemplate(
      //получаем фаблон инцидента в зависимости от выбранного дропдауна
      this.selectedIncident,
    );

    this.filledMessageTemplate = this.messageTemplateService.fillTemplate(
      //отдаем данные в темплейт и получаем в ответе текст инцидента.
      this.messageTemplate,
      {
        gatewayName: this.bankNameError ? this.bankNameError : ' ',
        errorCodes: this.bankCodeError ? this.bankCodeError : ' ',
        startTime: this.dateTime ? this.formattedDate(this.dateTime) : ' ',
        lkType: this.lkType ? this.lkType : ' ',
        bankTruble: this.bankTruble ? this.bankTruble : ' ',
      },
    );
  }

  open() {
    //метод
    console.log(this.incidentsForm.controls);
    this.submitEvent.emit();

    this.updateIncedentMessageTemplate();
    const modalRef = this.modalService.open(NgbdModal1Content);
    modalRef.componentInstance.incedentMessage = this.filledMessageTemplate;
  }

  formattedDate(value: string) {
    //форматируем дату
    const dateObj = new Date(value);
    return dateObj
      .toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', '');
  }
}

@NgModule({
  declarations: [
    NgbdModal1Content,
    NgbdModal1Content,
    NgbdModal2Content,
    NgbdModal3Content,
    NgbdModal4Content,
  ],
  imports: [CommonModule, FormsModule, MatIconModule],
  providers: [NgbModal, NgbActiveModal],
})
export class DropdownSendModule {}
