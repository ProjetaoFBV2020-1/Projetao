import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnTotalValueOrder1591237015335
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'total_value',
                type: 'decimal',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orders', 'total_value');
    }
}
