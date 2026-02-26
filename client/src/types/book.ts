export interface Book {
  id: string,
  subject: string,
  title: string,
  author: string,
  publishedDate: string | number | null,
  description: string | null
  categories: string[],
  thumbnail: string,
}