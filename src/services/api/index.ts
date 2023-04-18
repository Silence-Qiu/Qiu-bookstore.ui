import { request } from 'umi';

export const baseURL = '/api';

export function getBooks(params: {
  skip?: number | 1 | undefined;
  limit: number | 10 | undefined;
  search?: string;
}) {
  return request<any>(`${baseURL}/books`, {
    method: 'GET',
    params: { ...params },
  });
}

export function addBook(body: any) {
  return request<any>(`${baseURL}/books`, {
    method: 'POST',
    data: body,
  });
}

export function deleteBook(id: any) {
  return request<any>(`${baseURL}/books/${id}`, {
    method: 'DELETE',
  });
}

export function updateBook(id: any, body: any) {
  return request<any>(`${baseURL}/books/${id}`, {
    method: 'PUT',
    data: body,
  });
}

export function getBook(id: any) {
  return request<any>(`${baseURL}/books/${id}`, {
    method: 'GET',
  });
}






export function getClasses(params: {
  skip?: number | 1 | undefined;
  limit: number | 10 | undefined;
  search?: string;
}) {
  return request<any>(`${baseURL}/classes`, {
    method: 'GET',
    params: { ...params },
  });
}

export function addClass(body: any) {
  return request<any>(`${baseURL}/classes`, {
    method: 'POST',
    data: body,
  });
}

export function deleteClass(id: any) {
  return request<any>(`${baseURL}/classes/${id}`, {
    method: 'DELETE',
  });
}

export function updateClass(id: any, body: any) {
  return request<any>(`${baseURL}/classes/${id}`, {
    method: 'PUT',
    data: body,
  });
}

export function getClass(id: any) {
  return request<any>(`${baseURL}/classes/${id}`, {
    method: 'GET',
  });
}









export function getStudents(params: {
  skip?: number | 1 | undefined;
  limit: number | 10 | undefined;
  search?: string;
}) {
  return request<any>(`${baseURL}/students`, {
    method: 'GET',
    params: { ...params },
  });
}

export function addStudent(body: any) {
  return request<any>(`${baseURL}/students`, {
    method: 'POST',
    data: body,
  });
}

export function deleteStudent(id: any) {
  return request<any>(`${baseURL}/students/${id}`, {
    method: 'DELETE',
  });
}

export function updateStudent(id: any, body: any) {
  return request<any>(`${baseURL}/students/${id}`, {
    method: 'PUT',
    data: body,
  });
}

export function getStudent(id: any) {
  return request<any>(`${baseURL}/students/${id}`, {
    method: 'GET',
  });
}











export function getStudentBorrowBooks(params: {
  skip?: number | 1 | undefined;
  limit: number | 10 | undefined;
  status?:number,
  search?: string;
}) {
  return request<any>(`${baseURL}/student-borrow-books`, {
    method: 'GET',
    params: { ...params },
  });
}

export function addStudentBorrowBook(body: any) {
  return request<any>(`${baseURL}/student-borrow-books`, {
    method: 'POST',
    data: body,
  });
}

export function deleteStudentBorrowBook(id: any) {
  return request<any>(`${baseURL}/student-borrow-books/${id}`, {
    method: 'DELETE',
  });
}

export function returnStudentBorrowBook(id: any) {
  return request<any>(`${baseURL}/student-borrow-books/${id}/return`, {
    method: 'PUT',
  });
}

export function getStudentBorrowBook(id: any) {
  return request<any>(`${baseURL}/student-borrow-books/${id}`, {
    method: 'GET',
  });
}


