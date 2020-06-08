import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import Item from '@modules/items/infra/typeorm/entities/Item';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import PhoneCompany from './PhoneCompany';
import AddressCompany from './AddressCompany';

@Entity('companies')
class Company {
    @PrimaryGeneratedColumn('uuid')
    id_company: string;

    @Column()
    cnpj: string;

    @Column()
    company_name: string;

    @Column()
    trade_name: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Column()
    password: string;

    @Column()
    inactive: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => AddressCompany, address => address.company_id)
    adresses: AddressCompany;

    @OneToMany(() => Item, items => items.company_id)
    items: Item;

    @OneToMany(() => PhoneCompany, phone => phone.company_id)
    phones: PhoneCompany[];

    @OneToMany(() => Order, orders => orders.company_id)
    orders: Order;
}

export default Company;
