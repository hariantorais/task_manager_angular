import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {CardFormComponent} from "../card-form/card-form.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faPencilAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import {TaskListService} from "../../services/task-list.service";
import {CardService} from "../../services/card.service";
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {BoardService} from "../../services/board.service";
import {UnauthorizedComponent} from "../../../../shared/components/unauthorized/unauthorized.component";

@Component({
  selector: 'app-board-show',
  standalone: true,
  imports: [
    CardFormComponent,
    FaIconComponent,
    FormsModule,
    UnauthorizedComponent
  ],
  templateUrl: './show-board.component.html',
  styleUrl: './show-board.component.css'
})
export class ShowBoardComponent implements OnInit, AfterViewInit {
  lists: any[] = [];
  showForm: boolean[] = [];
  taskListService = inject(TaskListService);
  cardService = inject(CardService);
  editCardMode: boolean[] = [];

  currentBoardId: number = 0;
  errorCode: number = 0;


  board: any = {};

  @ViewChild('listNameInput') listNameInput!: ElementRef;

  isLoading: { [key: number]: boolean } = {}; // for showing
  isEditList: boolean[] = [];
  isEditBoardName: boolean = false;
  boardService = inject(BoardService);

  constructor(
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngAfterViewInit() {
    if (this.listNameInput) {
      setTimeout(() => {
        this.listNameInput.nativeElement.focus();
        this.cdr.detectChanges();
      }, 100);
    }
  }

  toggleEditListMode(listId: number = 0) {
    this.hideAllForms();
    this.isEditList[listId] = !this.isEditList[listId];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      if (res) {
        this.currentBoardId = res.id;
        this.loadBoardById(res.id);
      }
    })
  }

  editBoardName() {
    this.isEditBoardName = !this.isEditBoardName;
  }

  loadBoardById(id: number) {
    this.boardService.getBoardById(id).subscribe({
      next: (response) => {
        this.lists = response.data.lists;
        this.board = response.data;
      },
      error: (error) => {
        this.errorCode = error.status;
      }
    });

  }

  toggleEditCardMode(cardId: number) {
    this.hideAllForms();
    this.editCardMode[cardId] = !this.editCardMode[cardId];
  }


  saveCardChanges(listId: number, card: any, newTitle: string) {
    card.title = newTitle;

    this.cardService.updateCard(listId, card).subscribe(() => {
      this.toggleEditCardMode(card.id);
      this.hideAllForms();
      this.loadBoardById(this.currentBoardId);
    });
  }

  saveListName(listId: number, newName: string) {
    const list = this.lists.find(list => list.id === listId);
    if (list) {
      this.taskListService.updateTaskList(list.id, {name: newName}).subscribe();
    }
    this.isEditList[listId] = false;
  }

  cancelEditList(listId: number) {
    this.isEditList[listId] = false;
  }

  saveBoardName(boardId: number, newName: string) {
    this.boardService.updateBoard(boardId, {name: newName}).subscribe();
    this.isEditBoardName = false;
  }

  cancelEditBoardName() {
    this.isEditBoardName = false;
  }

  onCardMove(cardId: number, obj: any) {
    this.cardService.moveCard(cardId, obj.newListId).subscribe(() => {
      this.hideAllForms();
      this.loadBoardById(this.currentBoardId);
    })
  }


  hideAllForms() {
    this.showForm = this.showForm.map(() => false);
    this.editCardMode = this.editCardMode.map(() => false);
    this.isEditList = this.isEditList.map(() => false);
  }

  showAddCardForm(listId: number): void {
    this.hideAllForms();
    this.showForm[listId] = true;
  }

  addCard(listId: number, title: string) {
    this.cardService.storeCard(listId, title).subscribe(() => {
      this.hideAllForms();
      this.loadBoardById(this.currentBoardId);
    })
  }

  onCancel() {
    this.hideAllForms()
  }

  onDelete(cardId: number): void {

    const isDelete = confirm('Are you sure you want to delete this card?');
    if (isDelete) {
      this.cardService.deleteCard(cardId).subscribe(() => {
        this.hideAllForms();
        this.loadBoardById(this.currentBoardId);
      })
    }

  }

  protected readonly faPlus = faPlus;
  protected readonly faPencilAlt = faPencilAlt;
}
