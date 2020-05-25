import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipOrderItems1590368443948
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                name: 'OrderIdInOrderItems',
                columnNames: ['order_id'],
                referencedColumnNames: ['id_order'],
                referencedTableName: 'orders',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_items', 'OrderIdInOrderItems');
    }
}
