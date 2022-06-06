import { Group } from '@mariadb/models';

export default class GroupController {
  createOneGroup = async (group: Group): Promise<Group | Error> => {
    const result = await this.findOneGroupByName(group.name);

    if (result) return new Error('Group already exist !');
    else return Group.create(group);
  };

  findOneGroupByName = async (groupName: string): Promise<Group> => {
    return Group.findOne({ where: { name: groupName } });
  };

  updateGroupByName = async (groupId: string, group: Group): Promise<Group> => {
    const result = await this.findOneGroupByName(groupId);

    if (!result) return Promise.reject(Error('Group not found !'));

    return result.update(group);
  };

  deleteGroupByName = async (groupId: string): Promise<void> => {
    const result = await this.findOneGroupByName(groupId);

    if (!result) return Promise.reject(Error('Group not found !'));

    return result.destroy();
  };

  deleteAllGroups = async (): Promise<void> => {
    return Group.truncate({
      restartIdentity: true
    });
  }
}
