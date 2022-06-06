import { User } from '@mariadb/models';

export default class UserController {
  createOneUser = async (user: User): Promise<User | Error> => {
    const result = await this.findOneUserByDiscordId(user.discordId);

    if (result) return new Error('User already exist !');
    else return User.create(user);
  };

  createManyUser = async (userlist: Array<User>): Promise<Array<User>> => {
    return User.bulkCreate(userlist);
  }

  findAllUsers = async (): Promise<Array<User>> => {
    return User.findAll();
  };

  findOneUserByDiscordId = async (discordId: string): Promise<User> => {
    return User.findOne({ where: { discordId } });
  };

  updateUserByDiscordId = async (discordId: string, user: User): Promise<User> => {
    const result = await this.findOneUserByDiscordId(discordId);

    if (!result) return Promise.reject(Error('User not found !'));

    return result.update(user);
  };

  deleteUserByDiscordId = async (discordId: string): Promise<void> => {
    const result = await this.findOneUserByDiscordId(discordId);

    if (!result) return Promise.reject(Error('User not found !'));

    return result.destroy();
  };

  deleteAllUsers = async (): Promise<void> => {
    return User.truncate({
      restartIdentity: true
    });
  }
}
