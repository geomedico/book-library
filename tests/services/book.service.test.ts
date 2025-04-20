import { describe, it, expect, beforeEach, vi, type Mocked } from 'vitest';

import { BookService } from '../../src/services/book.service.js';
import { HyperbeeBookRepository } from '../../src/infrastructure/db/hyperbee-book.repository.js';
import { BookStatus } from '../../src/common/enums/book-status.enum.js';
import { Book } from '../../src/models/book.model.js';

const mockRepo = {
  init: vi.fn(),
  create: vi.fn(),
  findByFilter: vi.fn(),
  updateStatus: vi.fn(),
  delete: vi.fn(),
} as unknown as Mocked<HyperbeeBookRepository>;

let service: BookService;

beforeEach(() => {
  vi.clearAllMocks();
  service = new BookService(mockRepo);
});

describe('BookService', () => {
  it('should initialize repository', async () => {
    await service.init();
    expect(mockRepo.init).toHaveBeenCalled();
  });

  it('should create a book', async () => {
    const mockBook = {
      title: 'Test Book',
      author: 'Tester',
      year: 2023,
      status: BookStatus.AVAILABLE,
    };

    const expectedBook: Book = {
      id: '1234',
      ...mockBook,
    };

    mockRepo.create.mockResolvedValue(expectedBook);

    const result = await service.create(mockBook);
    expect(result).toEqual(expectedBook);
    expect(mockRepo.create).toHaveBeenCalledWith(mockBook);
  });

  it('should get all books with pagination and sorting', async () => {
    const books: Book[] = [
      { id: '1', title: 'B', author: 'A', year: 2021, status: BookStatus.AVAILABLE },
      { id: '2', title: 'A', author: 'B', year: 2020, status: BookStatus.FINISHED },
    ];

    mockRepo.findByFilter.mockResolvedValue(books);

    const result = await service.getAll({}, { page: 1, limit: 1, sortBy: 'title', sortOrder: 'asc' });

    expect(result.data.length).toBe(1);
    expect(result.total).toBe(2);
    expect(result.data[0].title).toBe('A');
  });

  it('should update book status', async () => {
    mockRepo.updateStatus.mockResolvedValue(true);
    const result = await service.updateStatus('123', BookStatus.READING);
    expect(result).toBe(true);
    expect(mockRepo.updateStatus).toHaveBeenCalledWith('123', BookStatus.READING);
  });

  it('should delete a book', async () => {
    mockRepo.delete.mockResolvedValue(true);
    const result = await service.delete('123');
    expect(result).toBe(true);
    expect(mockRepo.delete).toHaveBeenCalledWith('123');
  });
});
