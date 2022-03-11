import { DataTypes, Model } from '@sequelize/core';
import sequelize from '../utils/database';

interface UserInstance extends Model {
  id: number;
  name: string;
}

const UserModel = sequelize.define<UserInstance>('user', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export { UserModel };
