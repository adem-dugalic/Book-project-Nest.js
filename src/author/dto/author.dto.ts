import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  dob: Date;
  @IsNotEmpty()
  @IsString()
  image?: string;
  @IsArray()
  // @ArrayMinSize(1)
  idBook?: string[];
}

export class BookAuthor {
  @IsString()
  @IsNotEmpty()
  idBook: string;
  @IsString()
  @IsNotEmpty()
  idAuthor: string;
}

export class AuthorBooks {
  @IsArray()
  @ArrayMinSize(1)
  idBooks: string[];
}
