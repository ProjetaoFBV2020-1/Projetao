import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipCompanyItems1590368228044
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'items',
            new TableForeignKey({
                name: 'CompanyIdInItems',
                columnNames: ['company_id'],
                referencedColumnNames: ['id_company'],
                referencedTableName: 'companies',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('items', 'CompanyIdInItems');
    }
}
