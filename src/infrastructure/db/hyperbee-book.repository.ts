import Hypercore from 'hypercore';
import Hyperbee from 'hyperbee';
import { randomUUID } from 'crypto';
import { flatten, unflatten } from 'flat';


import { getDataStoragePath } from '../../common/utils/paths.js';
import { Book } from '../../models/book.model.js';
import { BookStatus } from '../../common/enums/book-status.enum.js';
import { BookRepository } from '../../services/book.repository.js';

export class HyperbeeBookRepository implements BookRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  private db: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  private books: any;
  private initialized = false;

  constructor() {}

  async init(): Promise<void> {
    if (this.initialized) return;

    const core = new Hypercore(getDataStoragePath());

    this.db = new Hyperbee(core, {
      keyEncoding: 'utf-8',
      valueEncoding: 'json',
    });

    await this.db.ready();
    this.books = this.db.sub('books');
    this.initialized = true;
    console.log('📚 Book DB initialized');
  }

  async close(): Promise<void> {
    if (this.db?.core?.close && this.initialized) {
      await this.db.core.close();
      this.initialized = false;
      console.log('📕 Book DB is closed');
    }
  }

  async create(book: Omit<Book, 'id'>): Promise<Book> {
    const id = randomUUID();
    const flatBook = flatten(book);
    await this.books.put(id, flatBook);
    return { id, ...book };
  }

  async findAll(): Promise<Book[]> {
    const stream = this.books.createReadStream();
    const result: Book[] = [];

    for await (const { key, value } of stream) {
      const unflat = unflatten<unknown, Book>(value);
      result.push({ ...unflat, id: key });
    }

    return result;
  }

  async findByFilter(status?: BookStatus, author?: string): Promise<Book[]> {
    const all = await this.findAll();
    return all.filter((b) => {
      if (status && b.status !== status) return false;
      if (author && b.author !== author) return false;
      return true;
    });
  }

  async updateStatus(id: string, status: BookStatus): Promise<boolean> {
    const books = await this.findAll();
    const match = books.find((b) => b.id === id);
    if (!match) return false;

    const updated = { ...match, status };
    const flatBook = flatten(updated);
    await this.books.put(id, flatBook);
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const stream = this.books.createReadStream();
    for await (const { key } of stream) {
      if (key === id) {
        await this.books.del(key);
        return true;
      }
    }
    return false;
  }
}
