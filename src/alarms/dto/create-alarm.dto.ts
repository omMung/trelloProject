import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAlarmDto {
  @IsNumber()
  userId: number;

  @IsString()
  eventId: string;

  @IsString()
  message: string;
}
