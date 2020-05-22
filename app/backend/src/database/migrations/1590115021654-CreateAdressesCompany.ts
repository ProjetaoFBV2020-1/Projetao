import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAdressesCompany1590115021654
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'adresses_company',
                columns: [
                    {
                        name: 'company_id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                    },
                    {
                        name: 'city',
                        type: 'varchar',
                    },
                    {
                        name: 'neighborhood',
                        type: 'varchar',
                    },
                    {
                        name: 'street',
                        type: 'varchar',
                    },
                    {
                        name: 'number',
                        type: 'varchar',
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                    },
                    {
                        name: 'reference',
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
        await queryRunner.dropTable('adresses_company');
    }
}
