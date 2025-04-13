FROM node:20-alpine

WORKDIR /app

# Don't copy anything - we'll mount the source code as a volume
# Just install dependencies if package.json exists
COPY package.json package-lock.json* ./
RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]