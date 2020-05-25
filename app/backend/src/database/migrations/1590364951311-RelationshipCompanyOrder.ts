import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipCompanyOrder1590364951311
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'CompanyIdInOrder',
                columnNames: ['company_id'],
                referencedColumnNames: ['id_company'],
                referencedTableName: 'companies',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'CompanyIdInOrder');
    }
}
