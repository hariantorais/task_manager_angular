import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faArrowRight, faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    ModalComponent
  ],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent implements OnInit, AfterViewInit{
  @Input() initialTitle: string = '';
  @Input() isEdit: boolean = false;
  @Input() card: any;
  @Input() lists: any[] = [];
  @Output() formSubmit = new EventEmitter<string>();
  @Output() cancelForm = new EventEmitter<void>();
  @Output() moveCard = new EventEmitter<any>();
  @Output() deleteCard = new EventEmitter<any>();
  @ViewChild('cardTitleInput') cardTitleInput!: ElementRef;


  title: string = '';
  isEditMethod: boolean = false;
  showModal : boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.cardTitleInput.nativeElement.focus();
    this.cdr.detectChanges();
  }

  ngOnInit(){
    this.title = this.initialTitle;
    this.isEditMethod = this.isEdit;
  }


  onSubmit(){
    if(this.title.trim()){
      this.formSubmit.emit(this.title);
      this.title = '';
    }
  }

  onCancel(){
    this.cancelForm.emit();
  }

  onMove(){
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

  handleMove(newListId: number){
    this.moveCard.emit({cardId: this.card.id, newListId: newListId});
    this.showModal = false;
  }

  handleDelete(){
    this.deleteCard.emit();
    this.showModal = false;
  }
  protected readonly faTimes = faTimes;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faTrash = faTrash;
}
