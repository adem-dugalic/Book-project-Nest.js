import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorBooks, AuthorDto, BookAuthor } from './dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(author: AuthorDto) {
    const authorData = [];
    author.idBook.map((item: string) => {
      authorData.push({ idBook: item });
    });

    const createdAuthor = await this.prisma.author.create({
      data: {
        firstName: author.firstName,
        lastName: author.lastName,
        dob: author.dob,
        image: author.image,
        books: {
          createMany: {
            data: authorData,
            skipDuplicates: true,
          },
        },
      },
    });
    return createdAuthor;
  }

  async getAuthors() {
    const authors = await this.prisma.author.findMany({
      include: { books: { select: { book: true } } },
    });
    return authors;
  }

  async getAuthorBooks(id: string) {
    const books = await this.prisma.author.findUnique({
      where: {
        id: id,
      },
      select: {
        books: true,
      },
    });

    return books;
  }

  async getAuthor(id: string) {
    const author = await this.prisma.author.findUnique({
      where: {
        id: id,
      },
      select: {
        image: true,
        id: true,
        dob: true,
        firstName: true,
        lastName: true,
        books: {
          select: {
            book: {
              select: {
                title: true,
                pages: true,
                isbn: true,
                published: true,
                image: true,
              },
            },
          },
        },
      },
    });
    return author;
  }

  async setAuthorBooks(id: string, dto: AuthorBooks) {
    const bookData = [];
    dto.idBooks.map((item: string) => {
      bookData.push({ idBook: item });
    });
    const setAuthors = await this.prisma.author.update({
      where: {
        id: id,
      },
      data: {
        books: {
          createMany: {
            data: bookData,
            skipDuplicates: true,
          },
        },
      },
    });
    return setAuthors;
  }

  async editAuthor(id: string, author: AuthorDto) {
    // const authorData = [];
    // author.idBook.map((item: string) => {
    //   authorData.push({ idBook: item });
    // });
    const updatedAuthor = await this.prisma.author.update({
      where: {
        id: id,
      },
      data: {
        firstName: author.firstName,
        lastName: author.lastName,
        dob: author.dob,
        image: author.image,
        // books: {
        //   createMany: {
        //     data: authorData,
        //     skipDuplicates: true,
        //   },
        // },
      },
    });
    return { msg: 'Updated author', book: updatedAuthor };
  }

  async deleteAuthorBook(dto: BookAuthor) {
    const deletedBook = await this.prisma.authorBookRelation.delete({
      where: {
        idAuthor_idBook: { idAuthor: dto.idAuthor, idBook: dto.idBook },
      },
    });
    return { msg: 'Deleted book', book: deletedBook };
  }

  async deleteAuthor(id: string) {
    const deletedAuthor = await this.prisma.author.delete({
      where: {
        id: id,
      },
    });
    return { msg: 'Deleted author', book: deletedAuthor };
  }
}
