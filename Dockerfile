FROM node:10.16-alpine

WORKDIR /HouseholdAccountBookApp
ADD . /HouseholdAccountBookApp

RUN npm install