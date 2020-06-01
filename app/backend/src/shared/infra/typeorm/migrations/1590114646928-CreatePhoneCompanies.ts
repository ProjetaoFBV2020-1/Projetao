import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePhoneCompanies1590114646928
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'phones_companies',
                columns: [
                    {
                        name: 'company_id',
                        type: 'uuid',
                    },
                    {
                        name: 'number',
                        type: 'varchar',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('phones_companies');
    }
}
