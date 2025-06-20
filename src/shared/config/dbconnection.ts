import mysql, {
  ResultSetHeader,
  RowDataPacket,
  type PoolOptions,
} from "mysql2/promise";

export class DBConnection {
  private static _instance: DBConnection;

  private readonly _pool: mysql.Pool;

  private readonly options: PoolOptions = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
    port: Number(process.env.PORT_DB),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };

  private constructor() {
    this._pool = mysql.createPool(this.options);
  }

  public static getInstance(): DBConnection {
    if (!DBConnection._instance) {
      DBConnection._instance = new DBConnection();
    }

    return DBConnection._instance;
  }

  public getPool(): mysql.Pool {
    return this._pool;
  }

  public async query<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    values?: any
  ) {
    const connection = await this._pool.getConnection();

    try {
      const [results] = await connection.query(sql, values);

      return results as T;
    } finally {
      connection.release();
    }
  }

  public async testConnection(): Promise<void> {
    try {
      const connection = await this._pool.getConnection();
      connection.release();

      console.log("Database connection successful ⚡️");
    } catch (error) {
      throw error;
    }
  }
}
