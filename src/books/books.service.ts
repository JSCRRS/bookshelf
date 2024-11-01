import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  public constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  public async createBook(book: CreateBookDto): Promise<any> {
    const searchResult = await this.repository.findOneBy({ title: book.title });
    if (searchResult) {
      throw new ConflictException(
        `Book with title '${book.title}' already exists.`,
      );
    }
    return await this.repository.save({
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
}
