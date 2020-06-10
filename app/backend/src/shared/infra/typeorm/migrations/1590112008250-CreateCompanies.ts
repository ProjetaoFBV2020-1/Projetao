import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCompanies1590112008250
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'companies',
                columns: [
                    {
                        name: 'id_company',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                    },
                    {
                        name: 'trade_name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'inactive',
                        type: 'boolean',
                        default: false,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('companies');
    }
}
