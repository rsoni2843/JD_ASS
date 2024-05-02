// menu.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { EndScreen } from './end-screen.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon_location: string;

  @ManyToOne(() => Menu, { nullable: true })
  @JoinTable()
  parent: Menu;

  @OneToOne(() => EndScreen, (endScreen) => endScreen.menu)
  @JoinColumn()
  endScreen: EndScreen;
}
