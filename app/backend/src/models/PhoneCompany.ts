import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('phones')
class PhoneCompany {
    @Column()
    company_id: string;

    @Column()
    number: string;

    @Column()
    type: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default PhoneCompany;
