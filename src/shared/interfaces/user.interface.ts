export interface User {
  id?: string;
  name: string;
  lastname: string;
  email?: string;
  rfc: string;
  zip_code: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export interface CreateUserInput {
  name: string;
  email?: string;
  lastname: string;
  rfc: string;
  zip_code: string;
}

export interface UpdateUserInput {
  name?: string;
  lastname?: string;
  email?: string;
  rfc?: string;
  zip_code?: string;
}
