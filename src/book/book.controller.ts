import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookService } from './book.service';
import { BookAuthor, BookAuthors, BookDto, BookUpdateDto } from './dto';

@Controller('books')
export class BookController {
  constructor(private bookS: BookService) {}

  @Get()
  getBooks() {
    return this.bookS.getBooks({});
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    return this.bookS.getBook(id, {
      image: true,
      isbn: true,
      pages: true,
      title: true,
      published: true,
      authors: {
        select: {
          author: {
            select: {
              dob: true,
              firstName: true,
              id: true,
              image: true,
              lastName: true,
            },
          },
        },
      },
    });
  }

  @Get(':id/authors')
  getBookAuthors(@Param('id') id: string) {
    return this.bookS.getBookAuthors(id);
  }
  @UseGuards(JwtGuard)
  @Post()
  createBook(@Body() dto: BookDto) {
    return this.bookS.createBook(dto);
  }
  @UseGuards(JwtGuard)
  @Post(':id/authors')
  setBookAuthors(@Param('id') id: string, @Body() dto: BookAuthors) {
    return this.bookS.setBookAuthors(id, dto);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  editBook(@Param('id') id: string, @Body() dto: BookUpdateDto) {
    return this.bookS.editBook(id, dto);
  }
  @UseGuards(JwtGuard)
  @Delete(':idBook/authors/:idAuthor')
  deleteBookAuthor(@Param() dto: BookAuthor) {
    return this.bookS.deleteBookAuthor(dto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.bookS.deleteBook(id);
  }
}
