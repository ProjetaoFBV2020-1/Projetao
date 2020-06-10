import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateQrCodeTables1591799763641
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'qrcodes',
                columns: [
                    {
                        name: 'id_qrcode',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
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
                ],
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'qrcode_companies',
                columns: [
                    {
                        name: 'id_qrcode_company',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'company_id',
                        type: 'uuid',
                    },
                    {
                        name: 'qrcode_id',
                        type: 'uuid',
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
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'QrCodeFK',
                        referencedTableName: 'qrcodes',
                        referencedColumnNames: ['id_qrcode'],
                        columnNames: ['qrcode_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'CompanyFK',
                        referencedTableName: 'companies',
                        referencedColumnNames: ['id_company'],
                        columnNames: ['company_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('qrcode_companies');
        await queryRunner.dropTable('qrcodes');
    }
}
