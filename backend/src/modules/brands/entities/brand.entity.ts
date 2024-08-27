import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    brandId: number;

    @Column({ unique: true })
    brandName: string;

    @Column({ unique: true })
    brandSlug: string;

    @Column({ nullable: true })
    brandDescription: string;

    @Column({ nullable: true })
    brandImage: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
