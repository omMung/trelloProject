import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckitemDto } from './create-checkitem.dto';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

// export class UpdateCheckitemDto extends PartialType(CreateCheckitemDto) {}
export class UpdateCheckitemDto {
  @IsInt()
  @IsNotEmpty()
  checklistId: number;

  @IsString()
  title: string;

  @IsBoolean()
  status: boolean;

  @IsInt()
  position: number;

  @IsInt()
  memberId: number;
}
