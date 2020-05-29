import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from 'typeorm';

@Entity('phones_companies')
class PhoneCompany {
    @PrimaryColumn()
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
