import { DataSource } from "typeorm";

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "mydatabase",
  logging: false,
  synchronize: true,
  entities: ["db/models/*.ts"],
});
