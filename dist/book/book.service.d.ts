import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookAuthor, BookAuthors, BookDto, BookUpdateDto } from './dto';
export declare class BookService {
    private prisma;
    constructor(prisma: PrismaService);
    getBooks(params: {
        where?: Prisma.BookWhereInput;
        include?: Prisma.BookInclude;
        select?: Prisma.BookSelect;
        orderBy?: Prisma.BookOrderByWithRelationInput;
        skip?: number;
        take?: number;
    }): Promise<(import(".prisma/client").Book & {
        authors: {
            author: import(".prisma/client").Author;
        }[];
    })[]>;
    getBookAuthors(id: string): Promise<{
        authors: import(".prisma/client").AuthorBookRelation[];
    }>;
    createBook(book: BookDto): Promise<import(".prisma/client").Book>;
    setBookAuthors(id: string, dto: BookAuthors): Promise<import(".prisma/client").Book>;
    getBook(id: string, select?: Prisma.BookSelect): Promise<{}>;
    editBook(isbn: string, book: BookUpdateDto): Promise<{
        msg: string;
        book: import(".prisma/client").Book;
    }>;
    deleteBookAuthor(dto: BookAuthor): Promise<{
        msg: string;
        book: import(".prisma/client").AuthorBookRelation;
    }>;
    deleteBook(isbn: string): Promise<{
        msg: string;
        book: import(".prisma/client").Book;
    }>;
}
