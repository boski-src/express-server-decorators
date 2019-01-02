import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, Min } from 'class-validator';

export class CreatePostBodyDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title : string;
  @IsString()
  @MaxLength(300)
  body : string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId : number;
}