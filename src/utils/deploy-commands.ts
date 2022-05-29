import { glob } from "glob";
import path from "path";
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const deployCommands = () => {
  const commandsDir = path.resolve(__dirname, '..', 'commands');
  const commandList = [];

  glob(`${commandsDir}/**/*.ts`, (_error: Error, commandFiles: Array<string>) => {
    commandFiles.forEach((file) => {
      const command = require(file);

      commandList.push(command.infos.toJSON());
    })

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    rest.put(Routes.applicationCommands(process.env.BBSC_BOT_ID), { body: commandList })
      .then(() => console.log('Successfully registered application commands.'))
      .catch(console.error);
  });


}

export default deployCommands;
