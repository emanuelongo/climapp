# Etapa 1: Build con Node
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

RUN npm install

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine AS runner

COPY --from=builder /app/out /usr/share/nginx/html

# Exponer el puerto de Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
