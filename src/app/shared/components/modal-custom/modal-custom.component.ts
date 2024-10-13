import {Component, EventEmitter,Input, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-modal-custom',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet
  ],
  templateUrl: './modal-custom.component.html',
  styleUrl: './modal-custom.component.css'
})
export class ModalCustomComponent {
  @Input() bodyTemplate: any;
  @Input() buttonSubmitTemplate: any;
  @Input() modalTitle!: string;
  @Output() closeModalDetail = new EventEmitter();

  onCancel() {
    this.closeModalDetail.emit();
  }

}
