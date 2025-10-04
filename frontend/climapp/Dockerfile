# Etapa 1: Build
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código del frontend
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa 2: Servir la aplicación
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copiar solo lo necesario del build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Exponer puerto 3000
EXPOSE 3000

# Ejecutar servidor de producción
CMD ["npm", "start"]
