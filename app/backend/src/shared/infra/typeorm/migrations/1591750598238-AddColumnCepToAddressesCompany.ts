import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnCepToAddressesCompany1591750598238
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'addresses_company',
            new TableColumn({
                name: 'cep',
                type: 'varchar',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('addresses_company', 'cep');
    }
}
