import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ICard} from "../../../../core/models/card.model";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  @Input() lists: any[] = [];
  @Input() card: any;
  @Output() closeModal = new EventEmitter<void>();
  @Output() moveCard = new EventEmitter<number>();
  @Output() deleteCard = new EventEmitter<void>();

  selectedListId: number = 0;

  constructor() {}

  ngOnInit(){
    this.selectedListId = this.card.task_list_id;
  }

  onMove() {
    if (this.selectedListId) {
      this.moveCard.emit(this.selectedListId);
    }
  }

  onCancel() {
    this.closeModal.emit();
  }

}
