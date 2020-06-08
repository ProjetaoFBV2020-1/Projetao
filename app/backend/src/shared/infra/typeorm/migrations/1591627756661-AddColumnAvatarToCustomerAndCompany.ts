import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnAvatarToCustomerAndCompany1591627756661
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'companies',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
        await queryRunner.addColumn(
            'customers',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('companies', 'avatar');
        await queryRunner.dropColumn('customers', 'avatar');
    }
}
