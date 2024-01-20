# Curso Next.js 14

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

## Development

1. Levantar base de datos

```bash
docker compose up -d
```

2. Renombrar el `.env.sample` a `.env` y reemplazar los datos

3. Ejecutar el `SEED` para crear la base de datos: [SEED](http://localhost:3000/api/seed)

4. Correr servidor en desarrollo

```bash
npm run dev
```

4. Abrir [localhost](http://localhost:3000) en el navegador.

## Prisma Comands

```bash
npx prisma init
npx prisma migrate dev
npx prisma generate
```
