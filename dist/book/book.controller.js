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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const book_service_1 = require("./book.service");
const dto_1 = require("./dto");
let BookController = class BookController {
    constructor(bookS) {
        this.bookS = bookS;
    }
    getBooks() {
        return this.bookS.getBooks({});
    }
    getBook(id) {
        return this.bookS.getBook(id, {
            image: true,
            isbn: true,
            pages: true,
            title: true,
            published: true,
            authors: {
                select: {
                    author: {
                        select: {
                            dob: true,
                            firstName: true,
                            id: true,
                            image: true,
                            lastName: true,
                        },
                    },
                },
            },
        });
    }
    getBookAuthors(id) {
        return this.bookS.getBookAuthors(id);
    }
    createBook(dto) {
        return this.bookS.createBook(dto);
    }
    setBookAuthors(id, dto) {
        return this.bookS.setBookAuthors(id, dto);
    }
    editBook(id, dto) {
        return this.bookS.editBook(id, dto);
    }
    deleteBookAuthor(dto) {
        return this.bookS.deleteBookAuthor(dto);
    }
    deleteBook(id) {
        return this.bookS.deleteBook(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBook", null);
__decorate([
    (0, common_1.Get)(':id/authors'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBookAuthors", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "createBook", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(':id/authors'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.BookAuthors]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "setBookAuthors", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.BookUpdateDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "editBook", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':idBook/authors/:idAuthor'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BookAuthor]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "deleteBookAuthor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "deleteBook", null);
BookController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map