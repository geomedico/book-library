import { Book } from './../models/book.model';
import { BookStatus } from './../common/enums/book-status.enum';

export interface BookRepository {
  /**
   * Initialize the repository connection (e.g., open Hyperbee store).
   */
  init(): Promise<void>;

  /**
   * Create a new book entry and return the complete book object with ID.
   */
  create(book: Omit<Book, 'id'>): Promise<Book>;

  /**
   * Fetch all stored books without any filtering.
   */
  findAll(): Promise<Book[]>;

  /**
   * Return filtered list of books by status and/or author.
   */
  findByFilter(status?: BookStatus, author?: string): Promise<Book[]>;

  /**
   * Update the status of a specific book.
   * @returns true if update succeeded, false if book not found
   */
  updateStatus(id: string, status: BookStatus): Promise<boolean>;

  /**
   * Delete a book by its ID.
   * @returns true if deletion succeeded, false if book not found
   */
  delete(id: string): Promise<boolean>;
}
