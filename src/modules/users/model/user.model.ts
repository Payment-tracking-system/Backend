import { Model } from 'sequelize-typescript';
import { AllowNull, Column, DataType, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @Column({ primaryKey: true, autoIncrement: true, field: 'user_id' })
  id: number;

  @AllowNull(false)
  @Column({ unique: true })
  id_telegram: number;
}
