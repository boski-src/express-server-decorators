import { IsNotEmpty, Matches } from 'class-validator';

export class CheckPostIdParamDto {
  @IsNotEmpty()
  @Matches(new RegExp(/^([1-9])$/))
  postId : number;
}