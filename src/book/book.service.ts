import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookAuthor, BookAuthors, BookDto, BookUpdateDto } from './dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getBooks(params: {
    where?: Prisma.BookWhereInput;
    include?: Prisma.BookInclude;
    select?: Prisma.BookSelect;
    orderBy?: Prisma.BookOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }) {
    const books = await this.prisma.book.findMany({
      include: { authors: { select: { author: true } } },
    });
    return books;
  }

  async getBookAuthors(id: string) {
    const authors = await this.prisma.book.findUnique({
      where: {
        isbn: id,
      },
      select: {
        authors: true,
      },
    });

    return authors;
  }

  async createBook(book: BookDto) {
    const bookData = [];
    book.idAuthor.map((item: string) => {
      bookData.push({ idAuthor: item });
    });

    const createdBook = await this.prisma.book.create({
      data: {
        isbn: book.isbn,
        title: book.title,
        pages: book.pages,
        published: book.published,
        image: book.image,
        authors: {
          createMany: {
            data: bookData,
            // data: [
            //   {
            //     idAuthor: book.idAuthor,
            //   },
            // ],
            skipDuplicates: true,
          },
        },
      },
    });
    return createdBook;
  }

  async setBookAuthors(id: string, dto: BookAuthors) {
    const bookData = [];
    dto.idAuthors.map((item: string) => {
      bookData.push({ idAuthor: item });
    });
    const setAuthors = await this.prisma.book.update({
      where: {
        isbn: id,
      },
      data: {
        authors: {
          createMany: {
            data: bookData,
            skipDuplicates: true,
          },
        },
      },
    });
    return setAuthors;
  }

  async getBook(id: string, select?: Prisma.BookSelect) {
    const book = await this.prisma.book.findUnique({
      where: {
        isbn: id,
      },
      select,
    });
    return book;
  }

  async editBook(isbn: string, book: BookUpdateDto) {
    // const bookData = [];
    // book.idAuthor.map((item: string) => {
    //   bookData.push({ idAuthor: item });
    // });
    console.log(book);
    const updatedBook = await this.prisma.book.update({
      where: {
        isbn: isbn,
      },
      data: {
        title: book.title,
        pages: book.pages,
        published: book.published,
        image: book.image,
      },
    });

    // authors: {
    //   createMany: {
    //     data: bookData,
    //     skipDuplicates: true,
    //   },
    // },

    return { msg: 'Updated book', book: updatedBook };
  }

  async deleteBookAuthor(dto: BookAuthor) {
    const deletedAuthor = await this.prisma.authorBookRelation.delete({
      where: {
        idAuthor_idBook: { idAuthor: dto.idAuthor, idBook: dto.idBook },
      },
    });
    return { msg: 'Deleted author', book: deletedAuthor };
  }

  async deleteBook(isbn: string) {
    console.log(isbn);
    const deletedBook = await this.prisma.book.delete({
      where: {
        isbn: isbn,
      },
    });
    return { msg: 'Deleted book', book: deletedBook };
  }
}
