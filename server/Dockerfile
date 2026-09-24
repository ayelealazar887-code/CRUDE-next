FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY tsconfig.json ./

COPY src ./src

RUN npm run build

# Copy Prisma generated files into the compiled application
RUN mkdir -p dist/generated/prisma && \
    cp -R src/generated/prisma/* dist/generated/prisma/

EXPOSE 5000

CMD ["npm", "start"]