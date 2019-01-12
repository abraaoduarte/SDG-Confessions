import express from 'express';
import dotenv from 'dotenv';
import Knex from 'knex';
import connection from '../knexfile';
import { Model } from 'objection';

dotenv.load();

const environment = process.env.NODE_ENV || 'development';

const knex = Knex(connection[environment]);
knex.migrate.latest([connection.knex]);
Model.knex(knex);

console.log('oi1');