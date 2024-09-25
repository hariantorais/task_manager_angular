import { TestBed } from '@angular/core/testing';

import { CardMemberService } from './card-member.service';

describe('CardMemberService', () => {
  let service: CardMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
