import { AuthorService } from './author.service';
import { AuthorBooks, AuthorDto, BookAuthor } from './dto';
export declare class AuthorController {
    private authorS;
    constructor(authorS: AuthorService);
    getAuthors(): Promise<(import(".prisma/client").Author & {
        books: {
            book: import(".prisma/client").Book;
        }[];
    })[]>;
    getAuthor(id: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        dob: Date;
        books: {
            book: {
                image: string;
                title: string;
                pages: number;
                isbn: string;
                published: number;
            };
        }[];
        image: string;
    }>;
    getAuthorBooks(id: string): Promise<{
        books: import(".prisma/client").AuthorBookRelation[];
    }>;
    createAuthor(dto: AuthorDto): Promise<import(".prisma/client").Author>;
    setAuthorBooks(id: string, dto: AuthorBooks): Promise<import(".prisma/client").Author>;
    editAuthor(id: string, dto: AuthorDto): Promise<{
        msg: string;
        book: import(".prisma/client").Author;
    }>;
    deleteAuthorBook(dto: BookAuthor): Promise<{
        msg: string;
        book: import(".prisma/client").AuthorBookRelation;
    }>;
    deleteAuthor(id: string): Promise<{
        msg: string;
        book: import(".prisma/client").Author;
    }>;
}
