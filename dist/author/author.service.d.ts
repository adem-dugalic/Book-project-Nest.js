import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorBooks, AuthorDto, BookAuthor } from './dto';
export declare class AuthorService {
    private prisma;
    constructor(prisma: PrismaService);
    createAuthor(author: AuthorDto): Promise<import(".prisma/client").Author>;
    getAuthors(): Promise<(import(".prisma/client").Author & {
        books: {
            book: import(".prisma/client").Book;
        }[];
    })[]>;
    getAuthorBooks(id: string): Promise<{
        books: import(".prisma/client").AuthorBookRelation[];
    }>;
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
    setAuthorBooks(id: string, dto: AuthorBooks): Promise<import(".prisma/client").Author>;
    editAuthor(id: string, author: AuthorDto): Promise<{
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
