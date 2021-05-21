# syntax=docker/dockerfile:experimental
FROM node:12.16.1-alpine3.9 as build
ARG NODE_ENV=production
ARG REACT_APP_VERSION
WORKDIR /build
ENV NODE_ENV=${NODE_ENV}
ENV REACT_APP_NAME=CAMS-FRONTEND
ENV REACT_APP_VERSION=${REACT_APP_VERSION}
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./.env.${NODE_ENV} ./
RUN --mount=type=cache,target=~/.npm npm ci
COPY ./public ./public
COPY ./src ./src
RUN npm run build

FROM registry.is74.ru/docker/nginx:1.17.9-alpine-r2
WORKDIR /var/www
COPY ./docker/prod/nginx.conf /tmp/templates/conf.d/default.conf
COPY --from=build /build/build ./
