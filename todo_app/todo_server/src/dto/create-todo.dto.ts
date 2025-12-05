import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ description: 'The todo item', maxLength: 140 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(140, { message: 'Todo must be 140 characters or less.' })
  todo!: string;
}
