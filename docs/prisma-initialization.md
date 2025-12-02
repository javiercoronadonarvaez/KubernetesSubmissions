Configure Prisma with Postgres

1. Add Prisma libraries from root:

   ```bash
   pnpm add prisma @prisma/client
   ```

2. Initialize Prisma:

   ```bash
   npx prisma init
   ```

3. Define the data model in `schema.prisma`.

4. Create Docker Postgres database to perform migration on:

   ```bash
   docker run --name todo-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=todo -p 5432:5432 -d postgres:latest
   ```

5. Set `.env` with the following value given what we defined in point 4:

   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo"
   ```

6. Perform migration:

   ```bash
   npx prisma migrate dev --name init
   ```

7. Generate `Prisma` files:

   ```bash
   npx prisma generate
   ```
