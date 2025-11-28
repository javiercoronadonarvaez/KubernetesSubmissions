FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/files
RUN mkdir -p /usr/src/app/config

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

## CMD ["pnpm", "start:debug"] FOR DEBUGGING
CMD ["pnpm", "start"] 