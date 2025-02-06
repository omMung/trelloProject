import {
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

// 카드, 리스트, 보드를 찾을 수 없을때
export class CardNotFoundException extends NotFoundException {
  constructor() {
    super(`해당하는 카드가 존재하지 않거나 보드 정보를 찾을 수 없습니다.`);
  }
}
// 라벨을 찾을 수 없을때
export class LabelNotFoundException extends NotFoundException {
  constructor() {
    super(`해당하는 라벨 정보를 찾을 수 없습니다.`);
  }
}
// 지정 라벨을 찾을 수 없을 때
export class CardLabelNotFoundException extends NotFoundException {
  constructor() {
    super(`지정된 라벨을 찾을 수 없습니다.`);
  }
}
// 이미 지정된 카드라벨 일때
export class CardLabelConflictException extends ConflictException {
  constructor() {
    super(`이미 지정되어 있는 라벨입니다.`);
  }
}

// 서버에 오류가 발생했을때
export class CardLabelInternalServerErrorException extends InternalServerErrorException {
  constructor() {
    super('서버에 오류가 발생하였습니다.');
  }
}

// 보드 멤버가 아닐 때
export class BoardMembersForbiddenException extends ForbiddenException {
  constructor() {
    super('보드 멤버가 아닙니다.');
  }
}
