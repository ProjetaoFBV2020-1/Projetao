import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipCompanyPhones1590367648167
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'phones_companies',
            new TableForeignKey({
                name: 'CompanyIdInPhones',
                columnNames: ['company_id'],
                referencedColumnNames: ['id_company'],
                referencedTableName: 'companies',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'phones_companies',
            'CompanyIdInPhones',
        );
    }
}
