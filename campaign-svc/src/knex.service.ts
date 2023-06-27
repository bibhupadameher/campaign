import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import log from 'log';
// eslint-disable-next-line no-var, @typescript-eslint/no-var-requires
var path = require('path');

@Injectable()
export class KnexService {
  databaseSchemaName = 'campaignsvc';
  svcName = 'boards';
  getKnexUtil() {
    let knexUtil;
    try {
      const config: Knex.Config = {
        client: 'sqlite3',
        connection: {
          filename: 'assets/board.db3',
        },
        useNullAsDefault: true,
        pool: { min: 0, max: 7 },
      };

      knexUtil = knex(config);
    } catch (e) {
      console.log(e);
    }
    return knexUtil;
  }

  async init(): Promise<string> {
    console.log('entry InitHandler');
    try {
      //create schema
      const knexUtil = this.getKnexUtil();

      const filePath = path.join(__dirname, '..', 'db', 'migrations');
      console.log('filepath: ' + filePath);
      const migrationConfig = {
        directory: filePath,
      };

      await knexUtil.migrate.latest(migrationConfig);

      console.log('Post migrateDb..');
      return 'Database initialized successfully';
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
