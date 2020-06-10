import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCollumnOrderCompCust1591765951308
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'company_name',
                type: 'varchar',
            }),
        );
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_name',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'company_name');
        await queryRunner.dropColumn('orders', 'customer_name');
    }
}
