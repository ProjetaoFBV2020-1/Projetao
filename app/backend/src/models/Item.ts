import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('items')
class Item {
    @PrimaryGeneratedColumn('uuid')
    id_item: string;

    @Column()
    name: string;

    @Column()
    value: number;

    @Column()
    description: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Item;
