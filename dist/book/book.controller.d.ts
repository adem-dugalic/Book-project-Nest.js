import { BookService } from './book.service';
import { BookAuthor, BookAuthors, BookDto, BookUpdateDto } from './dto';
export declare class BookController {
    private bookS;
    constructor(bookS: BookService);
    getBooks(): Promise<(import(".prisma/client").Book & {
        authors: {
            author: import(".prisma/client").Author;
        }[];
    })[]>;
    getBook(id: string): Promise<{}>;
    getBookAuthors(id: string): Promise<{
        authors: import(".prisma/client").AuthorBookRelation[];
    }>;
    createBook(dto: BookDto): Promise<import(".prisma/client").Book>;
    setBookAuthors(id: string, dto: BookAuthors): Promise<import(".prisma/client").Book>;
    editBook(id: string, dto: BookUpdateDto): Promise<{
        msg: string;
        book: import(".prisma/client").Book;
    }>;
    deleteBookAuthor(dto: BookAuthor): Promise<{
        msg: string;
        book: import(".prisma/client").AuthorBookRelation;
    }>;
    deleteBook(id: string): Promise<{
        msg: string;
        book: import(".prisma/client").Book;
    }>;
}
