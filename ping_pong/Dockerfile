FROM node:alpine

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/files

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

ENV PORT=3300
    
EXPOSE $PORT

CMD ["pnpm", "start"]