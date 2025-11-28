FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/files
RUN mkdir -p /usr/src/app/config

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

# Generate Prisma client
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
RUN npx prisma generate

ENV PORT=3001

EXPOSE $PORT

CMD ["pnpm", "start"]