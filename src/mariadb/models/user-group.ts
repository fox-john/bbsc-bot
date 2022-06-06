import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from '@sequelize/core';
import sequelize from '@mariadb/database';

class UserGroup extends Model<InferAttributes<UserGroup>, InferCreationAttributes<UserGroup>> {
  declare userId: number;
  declare groupId: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserGroup.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
  },
  groupId: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, { tableName: 'users_groups', sequelize })


export { UserGroup };
