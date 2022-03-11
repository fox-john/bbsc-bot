import { DataTypes } from '@sequelize/core';
import sequelize from '../utils/database';

const GroupModel = sequelize.define('group', {
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

export { GroupModel };
