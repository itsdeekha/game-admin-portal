import { MigrationInterface, QueryRunner } from 'typeorm';
import { Game } from '~/modules/game/entities/game.entity';

export class AddSampleGames1757809352041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sampleGames = [
      {
        name: 'Candy Crush Saga',
        title: 'Sweet Match-3 Puzzle Adventure',
        category: 'Puzzle',
        provider: 'King Digital Entertainment',
        description:
          'Join Tiffi and Mr. Toffee in their sweet adventure through the Candy Kingdom. Match 3 candies to progress through hundreds of levels in this deliciously fun puzzle game.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://king.com/game/candycrushsaga',
      },
      {
        name: 'PUBG Mobile',
        title: 'Battle Royale on Mobile',
        category: 'Battle Royale',
        provider: 'Tencent Games',
        description:
          '100-player battle royale on mobile. Drop in, loot up, and battle your way to be the last one standing. Multiple maps, weapons, and game modes available.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://pubgmobile.com',
      },
      {
        name: 'Subway Surfers',
        title: 'Endless Running Adventure',
        category: 'Arcade',
        provider: 'SYBO Games',
        description:
          'Join Jake, Tricky & Fresh in their endless running adventure! Surf through the subway tracks, dodge trains, and collect coins in this colorful endless runner.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://www.subwaysurfers.com',
      },
      {
        name: 'Among Us',
        title: 'Social Deduction Game',
        category: 'Social',
        provider: 'InnerSloth',
        description:
          'Play with 4-15 players online as you attempt to prep your spaceship for departure. But beware... one or more random players are impostors bent on killing everyone!',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://www.innersloth.com/games/among-us/',
      },
      {
        name: 'Clash of Clans',
        title: 'Strategy Village Builder',
        category: 'Strategy',
        provider: 'Supercell',
        description:
          'Build your village, raise a clan, and compete in epic Clan Wars! Upgrade your defenses and troops to protect your village and dominate your enemies.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://supercell.com/en/games/clashofclans/',
      },
      {
        name: 'Minecraft',
        title: 'Sandbox Creative Game',
        category: 'Sandbox',
        provider: 'Mojang Studios',
        description:
          'Explore infinite worlds and build everything from simple homes to grand castles. Play in Creative mode with unlimited resources or mine deep in Survival mode.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://www.minecraft.net',
      },
      {
        name: 'Genshin Impact',
        title: 'Open World Action RPG',
        category: 'RPG',
        provider: 'miHoYo',
        description:
          'Step into Teyvat, a vast world filled with life and flowing with elemental energy. Explore every inch of this wondrous world, join forces with diverse characters, and unravel countless mysteries.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://genshin.mihoyo.com',
      },
      {
        name: 'Call of Duty Mobile',
        title: 'First Person Shooter',
        category: 'FPS',
        provider: 'Activision',
        description:
          'Experience the thrill of Call of Duty on mobile! Play iconic maps and modes from Call of Duty history. Battle in Battle Royale or classic multiplayer matches.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://www.callofduty.com/mobile',
      },
      {
        name: 'Temple Run 2',
        title: 'Endless Running Adventure',
        category: 'Arcade',
        provider: 'Imangi Studios',
        description:
          'Navigate perilous cliffs, zip lines, mines and forests as you try to escape with the cursed idol. How far can you run in this endless adventure?',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://www.imangistudios.com/templerun2/',
      },
      {
        name: 'Roblox',
        title: 'User Generated Content Platform',
        category: 'Platform',
        provider: 'Roblox Corporation',
        description:
          'Roblox is the ultimate virtual universe that lets you create, share experiences with friends, and be anything you can imagine. Join millions of people and discover infinite variety of experiences.',
        imageUrl: 'https://placehold.co/400x200?text=Game+Image',
        gameUrl: 'https://www.roblox.com',
      },
    ];

    await queryRunner.manager.insert(Game, sampleGames);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
