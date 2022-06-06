import { entersState, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import { VoiceChannel } from "discord.js";

export async function connectToChannel(channel: VoiceChannel): Promise<VoiceConnection | Error> {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
    return connection;
  } catch (error) {
    connection.destroy();
    throw error;
  }
}
