import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {CardFormComponent} from "../card-form/card-form.component";
import {BoardService} from "../../services/board.service";
import {IBoard} from "../../../../core/models/board.model";
import {JsonPipe, NgForOf} from "@angular/common";
import {faPlus, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import {InputComponent} from "../../../../shared/components/input/input.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FaIconComponent,
    CardFormComponent,
    JsonPipe,
    NgForOf,
    InputComponent,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  boardService = inject(BoardService);

  boards: IBoard[] = [];
  showModalCreateBoard = false;

  isLoading = false;
  isLoadingCreateBoard = false;

  ngOnInit() {
    this.isLoading = true;
    this.loadBoards();
  }

  onRightClick(boardId: number, event: MouseEvent): void {
    event.preventDefault();
    const isDelete = confirm('Are you sure you want to delete this board?');
    if (isDelete) {
      this.boardService.deleteBoard(boardId).subscribe((res: any) => {
        if (res) {
          this.loadBoards();
        } else {
          alert('error : ' + res.message);
        }
      })
    }
  }

  loadBoards() {
    this.boardService.getBoards().subscribe((res: any) => {
      this.boards = res.data as IBoard[];
      this.isLoading = false;
    })
  }

  toggleModalCreateBoard() {
    this.showModalCreateBoard = !this.showModalCreateBoard;
  }


  onCancel() {
    this.showModalCreateBoard = false;
  }

  onSubmit() {
    this.isLoadingCreateBoard = true;
    if (this.formGroupCreateBoard.valid) {
      const formData: IBoard = this.formGroupCreateBoard.value as IBoard;

      this.boardService.storeBoard(formData).subscribe({
          next: (res: any) => {
            if (res) {
              this.loadBoards();
              this.showModalCreateBoard = false;
              this.isLoadingCreateBoard = false;
            } else {
              alert('Something went wrong');
            }
          },
          error: (error: any) => console.error('Error', error)
        }
      )

    }
  }

  errorMessages = {required: 'This field is required'};

  formGroupCreateBoard = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  protected readonly faPlus = faPlus;
  protected readonly faTrash = faTrash;
  protected readonly faSpinner = faSpinner;
}
