import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {BoardService} from "../../services/board.service";
import {TaskListService} from "../../services/task-list.service";

@Component({
  selector: 'app-board-create',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.css'
})
export class CreateBoardComponent implements OnInit {
  lists:any[] = [];
  boardService = inject(BoardService);
  taskListService = inject(TaskListService);

  constructor() { }

  ngOnInit(): void {
    this.taskListService.getTaskLists().subscribe((res: any) => {
      this.lists = res.data;
      console.log(res.data)
    })
  }

}
