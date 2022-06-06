import { Sequelize } from '@sequelize/core';

export default new Sequelize(
  'discord',
  'mariadb',
  '!SoiqhmC7A9ceEj$', {
  dialect: 'mariadb',
  host: 'localhost'
}
);
