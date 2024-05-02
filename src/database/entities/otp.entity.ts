import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ActionType {
  LOGIN = 'login',
  SIGNUP = 'signup',
  FORGOT_PASSWORD = 'forgot_password',
  EMAIL_UPDATE = 'email_update',
  MOBILE_UPDATE = 'mobile_update',
}

export enum OtpType {
  MOBILE = 'mobile',
  EMAIL = 'email',
}

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OtpType,
  })
  type: OtpType;

  @Column()
  code: string;

  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: ActionType,
  })
  action_type: ActionType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
