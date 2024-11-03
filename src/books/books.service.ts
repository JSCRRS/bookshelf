import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationOptionsDto } from '../pagination/PaginationOptionsDto';
import { PaginationDto } from '../pagination/PaginationDto';
import { PaginationMetaInformationDto } from '../pagination/PaginationMetaInformationDto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  public async createBook(book: CreateBookDto): Promise<Book> {
    const searchResult = await this.repository.findOneBy({ title: book.title });
    if (searchResult) {
      throw new ConflictException(
        `Book with title '${book.title}' already exists.`,
      );
    }
    const newBook = await this.repository.save({
      authors: book.authorIds.map((id) => ({ id })),
      title: book.title,
      year: book.year,
      yearFirstPublished: book.yearFirstPublished
        ? book.yearFirstPublished
        : undefined,
      edition: book.edition,
      language: book.language,
      publisher: { id: book.publisherId },
      genres: book.genreIds.map((id) => ({ id })),
      comment: book.comment ? book.comment : undefined,
    });
    return await this.repository.findOne({
      where: [{ id: newBook.id }],
      relations: ['authors', 'genres', 'publisher'],
    });
  }

  public async getAllBooks(
    paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationDto<Book>> {
    const booksQueryBuilder = this.repository.createQueryBuilder('books');

    const bookList = await booksQueryBuilder
      .orderBy('books.title')
      .skip(paginationOptionsDto.skipNumberOfPages)
      .take(paginationOptionsDto.itemsPerPage)
      .getMany();

    const numberOfAllItems = await booksQueryBuilder.getCount();

    const paginationMetaDto = new PaginationMetaInformationDto({
      numberOfAllItems,
      paginationOptionsDto,
    });

    return new PaginationDto(bookList, paginationMetaDto);
  }

  public async getBookByIdOrTitle(idOrTitle: string): Promise<Book> {
    const searchResult = await this.repository.findOne({
      where: [{ id: idOrTitle }, { title: idOrTitle }],
      relations: ['authors', 'genres', 'publisher'],
    });
    if (!searchResult) {
      throw new NotFoundException(
        `Could not find book with id or title '${idOrTitle}'.`,
      );
    }
    return searchResult;
  }

  public async updateBook(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const searchResult = await this.repository.findOne({
      where: [{ id: id }],
      relations: ['authors', 'genres', 'publisher'],
    });
    if (searchResult) {
      await this.repository.save({
        id,
        authors: updateBookDto.authorIds
          ? updateBookDto.authorIds.map((id) => ({ id }))
          : searchResult.authors,
        title: updateBookDto.title ? updateBookDto.title : searchResult.title,
        year: updateBookDto.year ? updateBookDto.year : searchResult.year,
        yearFirstPublished: updateBookDto.yearFirstPublished
          ? updateBookDto.yearFirstPublished
          : searchResult.yearFirstPublished,
        edition: updateBookDto.edition
          ? updateBookDto.edition
          : searchResult.edition,
        language: updateBookDto.language
          ? updateBookDto.language
          : searchResult.language,
        publisher: updateBookDto.publisherId
          ? { id: updateBookDto.publisherId }
          : searchResult.publisher,
        genres: updateBookDto.genreIds
          ? updateBookDto.genreIds.map((id) => ({ id }))
          : searchResult.genres,
        comment: updateBookDto.comment
          ? updateBookDto.comment
          : searchResult.comment,
      });
      return await this.repository.findOne({
        where: [{ id: id }],
        relations: ['authors', 'genres', 'publisher'],
      });
    } else {
      throw new NotFoundException(`Could not find book with id '${id}'.`);
    }
  }

  public async deleteBook(id: string): Promise<void> {
    const searchResult = await this.repository.findOneBy({ id: id });
    if (searchResult) {
      await this.repository.delete(id);
    } else {
      throw new NotFoundException(`Book with id '${id}' does not exist.`);
    }
  }
}
