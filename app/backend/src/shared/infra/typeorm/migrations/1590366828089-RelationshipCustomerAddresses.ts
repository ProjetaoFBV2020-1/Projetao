import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RelationshipCustomerAddresses1590366828089
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'adresses_customer',
            new TableForeignKey({
                name: 'CustomerIdInAddresses',
                columnNames: ['customer_id'],
                referencedColumnNames: ['id_customer'],
                referencedTableName: 'customers',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'adresses_customer',
            'CustomerIdInAddresses',
        );
    }
}
