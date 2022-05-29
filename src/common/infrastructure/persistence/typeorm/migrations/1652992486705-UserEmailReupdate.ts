import { SqlReader } from "node-sql-reader";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEmailReupdate1652992486705 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/user-email-reupdate.sql';
        let queries = SqlReader.readSqlFile(path);
        for (let query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}