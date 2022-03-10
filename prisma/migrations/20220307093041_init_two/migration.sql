-- DropForeignKey
ALTER TABLE "AuthorBookRelation" DROP CONSTRAINT "AuthorBookRelation_idAuthor_fkey";

-- DropForeignKey
ALTER TABLE "AuthorBookRelation" DROP CONSTRAINT "AuthorBookRelation_idBook_fkey";

-- AddForeignKey
ALTER TABLE "AuthorBookRelation" ADD CONSTRAINT "AuthorBookRelation_idBook_fkey" FOREIGN KEY ("idBook") REFERENCES "books"("isbn") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorBookRelation" ADD CONSTRAINT "AuthorBookRelation_idAuthor_fkey" FOREIGN KEY ("idAuthor") REFERENCES "authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
