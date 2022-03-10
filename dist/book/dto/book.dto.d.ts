export declare class BookDto {
    isbn: string;
    title: string;
    pages: number;
    published: number;
    idAuthor?: string[];
    image?: string;
}
export declare class BookAuthor {
    idBook: string;
    idAuthor: string;
}
export declare class BookUpdateDto {
    title: string;
    pages: number;
    published: number;
    image?: string;
}
export declare class BookAuthors {
    idAuthors: string[];
}
