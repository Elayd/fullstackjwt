import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  id: number;
  email: string;
  password?: string
}