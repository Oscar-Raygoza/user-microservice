import { DBConnection } from "../shared/config/dbconnection";
import { RowDataPacket, ResultSetHeader } from "mysql2";

import {
  User,
  CreateUserInput,
  UpdateUserInput,
} from "../shared/interfaces/user.interface";

import {
  PaginationOptions,
  PaginatedResponse,
} from "../shared/interfaces/pagination.interface";

import { buildUpdateSetClause } from "../shared/utils/QueryBuilder";

export default class UserRepository {
  private readonly db = DBConnection.getInstance();

  public async findAll(
    options: PaginationOptions
  ): Promise<PaginatedResponse<User>> {
    const {
      page = 1,
      limit = 10,
      sortBy = "created_at",
      sortOrder = "DESC",
    } = options;
    const offset = (page - 1) * limit;

    const countQuery = `SELECT COUNT(*) as total FROM users;`;

    const [countResult] = await this.db.query<RowDataPacket[]>(countQuery);

    const total = countResult.total;

    const dataQuery = `
      SELECT id, name, lastname, email, rfc, zip_code, created_at, updated_at, deleted_at
      FROM users
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?;
    `;

    const queryParams = [limit, offset];

    const rows = await this.db.query<RowDataPacket[]>(dataQuery, queryParams);
    const totalPages = Math.ceil(Number(total) / limit);

    return {
      items: rows as User[],
      currentPage: page,
      totalPages,
      totalRecords: Number(total),
      recordsPerPage: limit,
    };
  }

  public async findById(id: string): Promise<{ items: User[] }> {
    const query = `SELECT * FROM users WHERE id = ?;`;
    const rows = await this.db.query<RowDataPacket[]>(query, [id]);

    return {
      items: rows as User[],
    };
  }

  public async create(user: CreateUserInput): Promise<any> {
    try {
      const query = `
      INSERT INTO users (name, lastname, email, rfc, zip_code)
      VALUES (?, ?, ?, ?, ?);
    `;
      const result = await this.db.query<ResultSetHeader>(query, [
        user.name,
        user.lastname,
        user.email,
        user.rfc,
        user.zip_code,
      ]);

      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  public async update(id: string, userData: UpdateUserInput): Promise<boolean> {
    const { setClause, params } = buildUpdateSetClause(userData);

    if (!setClause) {
      return false;
    }

    const query = `
      UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL;
    `;
    const updateParams = [...params, id];

    const result = await this.db.query<ResultSetHeader>(query, updateParams);
    return result.affectedRows > 0;
  }

  public async softDelete(id: string): Promise<boolean> {
    const query = `
      UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL;
    `;

    const result = await this.db.query<ResultSetHeader>(query, [id]);

    return result.affectedRows > 0;
  }
}
