import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { AuthorService } from './author.service';
import { AuthorBooks, AuthorDto, BookAuthor } from './dto';

@Controller('authors')
export class AuthorController {
  constructor(private authorS: AuthorService) {}

  @Get()
  getAuthors() {
    return this.authorS.getAuthors();
  }

  @Get(':id')
  getAuthor(@Param('id') id: string) {
    return this.authorS.getAuthor(id);
  }

  @Get(':id/books')
  getAuthorBooks(@Param('id') id: string) {
    return this.authorS.getAuthorBooks(id);
  }
  @UseGuards(JwtGuard)
  @Post()
  createAuthor(@Body() dto: AuthorDto) {
    return this.authorS.createAuthor(dto);
  }
  @UseGuards(JwtGuard)
  @Post(':id/books')
  setAuthorBooks(@Param('id') id: string, @Body() dto: AuthorBooks) {
    return this.authorS.setAuthorBooks(id, dto);
  }
  @UseGuards(JwtGuard)
  @Patch(':id')
  editAuthor(@Param('id') id: string, @Body() dto: AuthorDto) {
    return this.authorS.editAuthor(id, dto);
  }
  @UseGuards(JwtGuard)
  @Delete(':idAuthor/books/:idBook')
  deleteAuthorBook(@Param('id') dto: BookAuthor) {
    return this.authorS.deleteAuthorBook(dto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteAuthor(@Param('id') id: string) {
    return this.authorS.deleteAuthor(id);
  }
}
