import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrderItems1590114252176
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_items',
                columns: [
                    {
                        name: 'id_order_item',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'order_id',
                        type: 'uuid',
                    },
                    {
                        name: 'item_id',
                        type: 'uuid',
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                    },
                    {
                        name: 'item_value',
                        type: 'double precision',
                    },
                    {
                        name: 'total_value',
                        type: 'double precision',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_items');
    }
}
