import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipItemsOrderItems1590368677892
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                name: 'ItemIdInOrderItems',
                columnNames: ['item_id'],
                referencedColumnNames: ['id_item'],
                referencedTableName: 'items',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('order_items', 'ItemIdInOrderItems');
    }
}
