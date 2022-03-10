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
exports.AuthorController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const author_service_1 = require("./author.service");
const dto_1 = require("./dto");
let AuthorController = class AuthorController {
    constructor(authorS) {
        this.authorS = authorS;
    }
    getAuthors() {
        return this.authorS.getAuthors();
    }
    getAuthor(id) {
        return this.authorS.getAuthor(id);
    }
    getAuthorBooks(id) {
        return this.authorS.getAuthorBooks(id);
    }
    createAuthor(dto) {
        return this.authorS.createAuthor(dto);
    }
    setAuthorBooks(id, dto) {
        return this.authorS.setAuthorBooks(id, dto);
    }
    editAuthor(id, dto) {
        return this.authorS.editAuthor(id, dto);
    }
    deleteAuthorBook(dto) {
        return this.authorS.deleteAuthorBook(dto);
    }
    deleteAuthor(id) {
        return this.authorS.deleteAuthor(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "getAuthors", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "getAuthor", null);
__decorate([
    (0, common_1.Get)(':id/books'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "getAuthorBooks", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "createAuthor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(':id/books'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AuthorBooks]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "setAuthorBooks", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.AuthorDto]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "editAuthor", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':idAuthor/books/:idBook'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BookAuthor]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "deleteAuthorBook", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthorController.prototype, "deleteAuthor", null);
AuthorController = __decorate([
    (0, common_1.Controller)('authors'),
    __metadata("design:paramtypes", [author_service_1.AuthorService])
], AuthorController);
exports.AuthorController = AuthorController;
//# sourceMappingURL=author.controller.js.map