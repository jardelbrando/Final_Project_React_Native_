import knex from 'knex';
import configuration from '../config/knexfile.cjs';

const database = knex(configuration);

export default database;