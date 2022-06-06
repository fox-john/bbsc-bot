import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from '@sequelize/core';
import sequelize from '@mariadb/database';

class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
  declare id: number;
  declare name: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Group.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, { tableName: 'group', sequelize })


export { Group };
