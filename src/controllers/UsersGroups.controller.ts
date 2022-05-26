import { UserGroup } from '../models';

export default class UserGroupController {
  addGroupAtUser = async (userGroup: UserGroup): Promise<UserGroup|Error>  => {
    const userAlreadyExistInGroup = this.findUserGroupAlreadyExist(userGroup);
    // const groupExist = GroupController.findOne({ where: { groupId, userId } });

    if (userAlreadyExistInGroup) return new Error('this user already are in this group !');
    // if (!groupExist) return new Error('this group does\'nt exist !');
    else return UserGroup.create(userGroup);
  };

  findUserGroupAlreadyExist = async (userGroup: UserGroup): Promise<UserGroup> => {
    return UserGroup.findOne({ where: { userId: userGroup.userId, groupId: userGroup.groupId } });
  };

  removeOneGroupAtUser = async (userGroup: UserGroup): Promise<void> => {
    const result = await this.findUserGroupAlreadyExist(userGroup);

    if (!result) return Promise.reject(Error('User already have this group !'));

    return result.destroy();
  };

  deleteAllGroupAtUserByUserId = async (userId: string): Promise<void> => {
    const result = await UserGroup.findAll({ where: { userId } });

    result.forEach((userGroup: UserGroup) => {
      userGroup.destroy();
    });
  }
}
