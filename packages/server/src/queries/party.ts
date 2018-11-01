import { Context, Party } from '../types';
import { Playlist } from '../spotify';
import { playlist } from './playlist';

interface PartyResult {
  id: string;
  playlistId: string;
  name: string;
  playlist: {
    id: string;
  };
}

export async function party(
  root,
  args: { partyId: string },
  context: Context,
): Promise<PartyResult> {
  console.log('party is', args);
  const party = await context.prisma.party({ id: args.partyId });

  return {
    id: party.id,
    name: party.name,
    playlistId: party.playlistId,
    playlist: { id: party.playlistId },
  };
}

export async function parties(
  root,
  args: { ids: [string] },
  context: Context,
): Promise<PartyResult[]> {
  const parties = await context.prisma.parties({ where: { id_in: args.ids } });

  return parties.map(party => ({
    id: party.id!,
    name: party.name!,
    playlistId: party.playlistId!,
    playlist: {
      id: party.playlistId!,
    },
  }));
}
