import {
  AfterViewInit,
  Component, effect,
  ElementRef,
  EventEmitter,
  inject,
  Input, OnInit,
  Output, signal,
  ViewChild
} from '@angular/core';
import {ModalCustomComponent} from "../../../../shared/components/modal-custom/modal-custom.component";
import {JsonPipe} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../user/services/user.service";
import {CardMemberService} from "../../services/card-member.service";
import {CardService} from "../../services/card.service";

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [
    ModalCustomComponent,
    JsonPipe,
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit, AfterViewInit {
  @Input() card!: any;
  @Output() onCloseModalDetail = new EventEmitter<void>();

  @ViewChild('addMemberInput') addMemberInput!: ElementRef;

  cardMemberService = inject(CardMemberService);
  isShowFormAddMember: boolean = false;


  userService = inject(UserService);
  searchMemberName = signal('');

  resultMembers: any[] = [];
  cardMembers = signal([]);

  cardService = inject(CardService);

  isListMemberLoading = false;
  isSelectMemberLoading = false;
  private debounceTimeout: any;

  constructor() {
    effect(() => {
      const searchText = this.searchMemberName();
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        if (searchText && searchText.trim() !== '') {
          this.isListMemberLoading = true;
          this.searchMember(searchText);
        } else {
          this.resultMembers = [];
        }
      }, 300);

    });


  }

  ngOnInit() {
    this.loadCardMembers();
  }

  ngAfterViewInit() {
    if (this.addMemberInput) {
      setTimeout(() => {
        this.addMemberInput.nativeElement.focus();
      }, 100);
    }
  }

  loadCardMembers() {
    this.cardService.getCard(this.card.id).subscribe((res: any) => {
      this.cardMembers.set(res.data.members);
    })
  }

  searchMember(query: string) {
    this.userService.searchUser(query, this.card.id).subscribe((res: any) => {
      this.loadResultMember(res.data);
    })
  }

  loadResultMember(data: any) {
    this.resultMembers = data;
    this.isListMemberLoading = false;
  }


  onSelectMember(memberId: number) {
    this.isSelectMemberLoading = true;
    this.cardMemberService.storeCardMember(memberId, this.card.id).subscribe((res: any) => {
      this.isShowFormAddMember = false;
      this.isSelectMemberLoading = false;
      this.resultMembers = [];
      console.log(res.message);
      this.loadCardMembers();
    });
  }


  onRemoveMember(memberId: number, cardId: number) {
    this.cardMemberService.deleteCardMember(memberId, cardId).subscribe((res: any) => {
      this.loadCardMembers();
    })
  }

  onShowFormAddMember() {
    this.isShowFormAddMember = !this.isShowFormAddMember;
  }

  onCloseModal() {
    this.onCloseModalDetail.emit();
  }

  onSearchInput(event: any) {
    const inputValue = event.target.value;
    this.searchMemberName.set(inputValue);
  }

  protected readonly faTimes = faTimes;
}
