import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipCustomerOrders1590366090356
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'CustomerIdInOrder',
                columnNames: ['customer_id'],
                referencedColumnNames: ['id_customer'],
                referencedTableName: 'customers',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'CustomerIdInOrder');
    }
}
