import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipCompanyAddresses1590366503262
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'addresses_company',
            new TableForeignKey({
                name: 'CompanyIdInAddresses',
                columnNames: ['company_id'],
                referencedColumnNames: ['id_company'],
                referencedTableName: 'companies',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'addresses_company',
            'CompanyIdInAddresses',
        );
    }
}
