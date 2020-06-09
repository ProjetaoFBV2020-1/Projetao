import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterColumnOrderStatus1591661909695
    implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'orders',
            'status',
            new TableColumn({
                name: 'status',
                type: 'integer',
                default: 1,
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'orders',
            'status',
            new TableColumn({
                name: 'status',
                type: 'varchar',
            }),
        );
    }
}
