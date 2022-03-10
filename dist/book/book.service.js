"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookService = class BookService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBooks(params) {
        const books = await this.prisma.book.findMany({
            include: { authors: { select: { author: true } } },
        });
        return books;
    }
    async getBookAuthors(id) {
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
    async createBook(book) {
        const bookData = [];
        book.idAuthor.map((item) => {
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
                        skipDuplicates: true,
                    },
                },
            },
        });
        return createdBook;
    }
    async setBookAuthors(id, dto) {
        const bookData = [];
        dto.idAuthors.map((item) => {
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
    async getBook(id, select) {
        const book = await this.prisma.book.findUnique({
            where: {
                isbn: id,
            },
            select,
        });
        return book;
    }
    async editBook(isbn, book) {
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
        return { msg: 'Updated book', book: updatedBook };
    }
    async deleteBookAuthor(dto) {
        const deletedAuthor = await this.prisma.authorBookRelation.delete({
            where: {
                idAuthor_idBook: { idAuthor: dto.idAuthor, idBook: dto.idBook },
            },
        });
        return { msg: 'Deleted author', book: deletedAuthor };
    }
    async deleteBook(isbn) {
        console.log(isbn);
        const deletedBook = await this.prisma.book.delete({
            where: {
                isbn: isbn,
            },
        });
        return { msg: 'Deleted book', book: deletedBook };
    }
};
BookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map