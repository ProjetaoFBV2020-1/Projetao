import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnNameOrderItem1591771808175
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'order_items',
            new TableColumn({
                name: 'name',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order_items', 'name');
    }
}
