import { Book } from './../models/book.model';
import { BookStatus } from './../common/enums/book-status.enum';
import { HyperbeeBookRepository } from '../infrastructure/db/hyperbee-book.repository';

export class BookService {
  constructor(private readonly bookRepo: HyperbeeBookRepository) {}

  async init() {
    await this.bookRepo.init();
  }

  async create(book: Omit<Book, 'id'>): Promise<Book> {

    return this.bookRepo.create(book);
  }

  async getAll(
    filters: { status?: BookStatus; author?: string },
    options: {
      page?: number;
      limit?: number;
      sortBy?: keyof Book;
      sortOrder?: 'asc' | 'desc';
    },
  ): Promise<{ data: Book[]; total: number }> {
    const all = await this.bookRepo.findByFilter(filters.status, filters.author);
  
    const sortKey = options.sortBy || 'title';
    const sortDirection = options.sortOrder === 'desc' ? -1 : 1;
  
    const sorted = all.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
  
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection * (aValue - bValue);
      }
  
      return sortDirection * String(aValue).localeCompare(String(bValue));
    });
  
    const page = options.page || 1;
    const limit = options.limit || 10;
    const start = (page - 1) * limit;
    const paginated = sorted.slice(start, start + limit);
  
    return {
      data: paginated,
      total: all.length,
    };
  }
  

  async updateStatus(id: string, status: BookStatus): Promise<boolean> {
    return this.bookRepo.updateStatus(id, status);
  }

  async delete(id: string): Promise<boolean> {
    return this.bookRepo.delete(id);
  }
}
