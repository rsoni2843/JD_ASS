// end-screen.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Menu } from './menu.entity';

@Entity()
export class EndScreen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  form_number: string;

  @Column()
  form_name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  path: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  created_by: string;

  @Column()
  updated_by: string;

  @ManyToMany(() => User, (user) => user.endScreens)
  @JoinColumn()
  users: User[];

  @OneToOne(() => Menu, (menu) => menu.endScreen, {
    cascade: true,
    eager: true,
  })
  menu: Menu;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
