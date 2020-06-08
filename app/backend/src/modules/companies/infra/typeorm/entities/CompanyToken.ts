import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';

@Entity('company_tokens')
class CompanyTokens {
    @PrimaryGeneratedColumn('uuid')
    id_token: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    company_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default CompanyTokens;
