
import type { Book } from "./book";

export interface Modal {
  open: boolean,
  onClose: () => void,
  country: string | null,
  books: Book[]
}