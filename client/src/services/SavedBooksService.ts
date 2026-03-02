import type { SavedBook } from "../types/book";

const baseUrl = 'http://localhost:3000';

export async function fetchSavedBooks(): Promise<SavedBook[]> {
  const res = await fetch(`${baseUrl}/reading-list`);
  if (!res.ok) throw new Error('Could not fetch books.')
  return await res.json();
}

export async function postBook(book: SavedBook): Promise<SavedBook> {
  const res = await fetch(`${baseUrl}/reading-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book)
  });
  if (!res.ok) throw new Error('Could not save book.')
  return await res.json();
}

export async function changeStatus(id: string, status: string): Promise<SavedBook> {
  const res = await fetch(`${baseUrl}/reading-list/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Could not update book status.')
  return await res.json();
}

export async function deleteBook(id: string): Promise<void> {
  const res = await fetch(`${baseUrl}/reading-list/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Could not delete book.')
}