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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthorService = class AuthorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAuthor(author) {
        const authorData = [];
        author.idBook.map((item) => {
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
    async getAuthorBooks(id) {
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
    async getAuthor(id) {
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
    async setAuthorBooks(id, dto) {
        const bookData = [];
        dto.idBooks.map((item) => {
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
    async editAuthor(id, author) {
        const updatedAuthor = await this.prisma.author.update({
            where: {
                id: id,
            },
            data: {
                firstName: author.firstName,
                lastName: author.lastName,
                dob: author.dob,
                image: author.image,
            },
        });
        return { msg: 'Updated author', book: updatedAuthor };
    }
    async deleteAuthorBook(dto) {
        const deletedBook = await this.prisma.authorBookRelation.delete({
            where: {
                idAuthor_idBook: { idAuthor: dto.idAuthor, idBook: dto.idBook },
            },
        });
        return { msg: 'Deleted book', book: deletedBook };
    }
    async deleteAuthor(id) {
        const deletedAuthor = await this.prisma.author.delete({
            where: {
                id: id,
            },
        });
        return { msg: 'Deleted author', book: deletedAuthor };
    }
};
AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthorService);
exports.AuthorService = AuthorService;
//# sourceMappingURL=author.service.js.map