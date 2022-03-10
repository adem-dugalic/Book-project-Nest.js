import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  isbn: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pages: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  published: number;
  @IsArray()
  idAuthor?: string[];

  @IsString()
  @IsNotEmpty()
  image?: string;
}

export class BookAuthor {
  @IsString()
  @IsNotEmpty()
  idBook: string;
  @IsString()
  @IsNotEmpty()
  idAuthor: string;
}

export class BookUpdateDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  pages: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  published: number;
  // @IsArray()
  // @ArrayMinSize(1)
  // idAuthor?: string[];

  @IsString()
  @IsNotEmpty()
  image?: string;
}

export class BookAuthors {
  @IsArray()
  @ArrayMinSize(1)
  idAuthors: string[];
}
