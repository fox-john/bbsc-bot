import { Collection, GuildMember, Snowflake } from "discord.js";
import UserController from "@mariadb/controllers/User.controller";
import { User } from "../models";

export class UserService {
  static async regeneratedUserListIntoDb(memberList: Collection<string, GuildMember>): Promise<Array<User>> {
    const userController = new UserController();

    const userListToInsert = memberList.map((member) => {
      return {
        discordId: member.id,
        name: member.displayName
      } as User
    });

    await userController.deleteAllUsers();
    return userController.createManyUser(userListToInsert);
  }

  static async addNewUserIntoDb(member: GuildMember): Promise<void> {
    const userController = new UserController();

    userController.createOneUser({ discordId: member.id, name: member.displayName } as User);
  }
}
