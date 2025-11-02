FROM node:alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

ENV PORT=5003
    
EXPOSE $PORT

CMD ["pnpm","dev","--","--host"]