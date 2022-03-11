import { Sequelize } from '@sequelize/core';

const sequelize = new Sequelize(
  'discord',
  'mariadb',
  '!SoiqhmC7A9ceEj$', {
    dialect: 'mariadb',
    host: 'localhost'
  }
);

export default sequelize;
