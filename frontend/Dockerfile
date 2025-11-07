# Etapa 1: Build do app React (Vite)
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx para servir os arquivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
