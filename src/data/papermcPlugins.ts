export interface PluginImage {
  src: string;
  alt: string;
}

export type PluginSection =
  | { kind: "text"; title?: string; body: string[] }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "table"; title: string; headers: string[]; rows: string[][] }
  | { kind: "images"; title: string; images: PluginImage[] }
  | { kind: "note"; tone?: "info" | "warn"; body: string };

export interface PaperMcPlugin {
  slug: string;
  name: string;
  tagline: string;
  /** Path under public/ — drop <slug>.png here when ready */
  logo: string;
  mcVersions: string;
  license: string;
  downloads?: number;
  status?: "active" | "discontinued";
  githubUrl: string;
  wikiUrl?: string;
  modrinthUrl?: string;
  /** One-line summary shown under the name on cards */
  highlights: string[];
  sections: PluginSection[];
}

const M = "https://cdn.modrinth.com";

export const papermcPlugins: PaperMcPlugin[] = [
  {
    slug: "gemstone-plugin",
    name: "Gemstone Plugin",
    tagline:
      "5 magical gemstones, each with its own power — combine them all to forge the legendary Super Gemstone!",
    logo: "/logos/gemstone-plugin.png",
    mcVersions: "Minecraft 1.21.1",
    license: "All Rights Reserved",
    downloads: 166,
    status: "discontinued",
    githubUrl: "https://github.com/vihaanvp/Gemstone-Plugin",
    wikiUrl: "https://github.com/vihaanvp/Gemstone-Plugin/wiki",
    modrinthUrl: "https://modrinth.com/mod/gemstone-plugin",
    highlights: [
      "RPG-style magic items",
      "Super Gemstone with 3 modes",
      "Great for SMPs & survival servers",
    ],
    sections: [
      {
        kind: "text",
        body: [
          "Ever seen those YouTube videos that go like \u201cI crafted the MOST POWERFUL Gemstone on this SMP\u201d? This plugin brings that exact experience to your Minecraft world — no mods needed, just a PaperMC server.",
          "Players discover and craft 5 unique gemstones — Blazite, Aquaryte, Terranox, Voltaryn and Noctyra. Each one grants a passive boost while held and has a special right-click ability. Craft all five and combine them into the Super Gemstone: one item with every passive at once and three switchable modes — Offence, Defence and Stealth.",
          "Everything happens naturally in-game through crafting and clicking — players never need to touch a command.",
        ],
      },
      {
        kind: "list",
        title: "// what your players get",
        items: [
          "Blazite — fire immunity while held; right-click to set enemies ablaze",
          "Aquaryte — breathe underwater and swim faster; right-click to teleport to water",
          "Terranox — extra strength; right-click the ground under open sky for a full heal",
          "Voltaryn — speed boost while held; right-click to strike lightning on enemies",
          "Noctyra — night vision while held; right-click to turn invisible for 3 minutes",
          "Super Gemstone — every power combined, with Offence / Defence / Stealth modes",
        ],
      },
      {
        kind: "text",
        title: "// binding gems to players",
        body: [
          "Worried about players losing their hard-earned gemstones? Craft a Gemstone Binder and combine it with a gemstone in an anvil — the Bound Gemstone can then never leave that player's inventory, even when they die.",
        ],
      },
      {
        kind: "images",
        title: "// crafting recipes",
        images: [
          { src: `${M}/data/SKmCv10B/images/d04c7ae87d999275d8d2c3b3d588e80605e20e2d_350.webp`, alt: "Gemstone Randomizer recipe" },
          { src: `${M}/data/SKmCv10B/images/e74732c7ca3779451d0473e1a4df32bd4d5bd359_350.webp`, alt: "Gemstone Binder recipe" },
          { src: `${M}/data/SKmCv10B/images/e8f964ce2eecb657bac9d536146a65fc20b155d1_350.webp`, alt: "Blazite recipe" },
          { src: `${M}/data/SKmCv10B/images/795a70189897c294c65f9dac4fce65aff748b06b_350.webp`, alt: "Aquaryte recipe" },
          { src: `${M}/data/SKmCv10B/images/cd558b5efbf5fb9939ff2faa7e84c12bf45e74d7_350.webp`, alt: "Terranox recipe" },
          { src: `${M}/data/SKmCv10B/images/1437da89c996a7753dc7f61fdf18fa1cc3875932_350.webp`, alt: "Voltaryn recipe" },
          { src: `${M}/data/SKmCv10B/images/3af3703bf8ab2193aeddec53f9802c692b34e5e6_350.webp`, alt: "Noctyra recipe" },
          { src: `${M}/data/SKmCv10B/images/11b053006aac1904b89cffa06d3c82f9591ba0bb_350.webp`, alt: "Super Gemstone recipe" },
          { src: `${M}/data/SKmCv10B/images/ac30df5769304a1ad106fea1d4aaeb2bb01a9f3d_350.webp`, alt: "Loot Box recipe" },
          { src: `${M}/data/SKmCv10B/images/2f5a6d4681c05b7cc03f17f7b83fd6f501d92e18_350.webp`, alt: "Revive Book recipe" },
        ],
      },
      {
        kind: "text",
        title: "// for server admins",
        body: [
          "Optional admin commands let you hand out any item directly — perfect for events, shops or giveaways. All commands require operator (op) status, so regular players can't abuse them.",
        ],
      },
      {
        kind: "table",
        title: "// admin commands",
        headers: ["Command", "What it does"],
        rows: [
          ["/givegem <name> [player]", "Gives someone a specific gemstone"],
          ["/giverandomizer <amount> [player]", "Gives Gemstone Randomizers (right-click for a random gem!)"],
          ["/givelootbox <player>", "Gives a Loot Box full of surprises"],
          ["/givebinder <amount> [player]", "Gives Gemstone Binders"],
          ["/giverevivebook <amount> [player]", "Gives Revive Books"],
          ["/deathdebuff <apply|remove> [player]", "Applies or removes a death debuff"],
          ["/deathban <player>", "Death-bans a player"],
          ["/removedeathban <player>", "Removes a death ban"],
        ],
      },
      {
        kind: "note",
        tone: "warn",
        body:
          "This plugin is no longer receiving updates, but it still works great on Minecraft 1.21.1. Got an idea for it? Open an issue on GitHub or reach out on Discord: vihaanvp.",
      },
    ],
  },
  {
    slug: "potionsteal",
    name: "PotionSteal",
    tagline:
      "Like LifeSteal, but with potion effects! Kill players to gain power — die too much and you're banned… unless a friend revives you.",
    logo: "/logos/potionsteal.png",
    mcVersions: "Minecraft 1.18 – 1.19",
    license: "MIT (open source)",
    downloads: 313,
    status: "active",
    githubUrl: "https://github.com/vihaanvp/PotionSteal",
    modrinthUrl: "https://modrinth.com/mod/potionsteal",
    highlights: [
      "LifeSteal-style SMP drama",
      "Craftable Elixirs & Revive Books",
      "Live scoreboard & tab display",
    ],
    sections: [
      {
        kind: "text",
        body: [
          "PotionSteal is a twist on the famous LifeSteal gamemode. Instead of stealing hearts, players steal potion power: every kill earns you balance (and stronger buffs), while every death costs you balance (and stacks painful debuffs).",
          "Hit rock bottom and you're banned from the server! But there's hope — friends can craft a Revive Book and bring you back through a simple in-game menu. The catch? It needs a rare Elixir of Renewal, so reviving someone is a real team effort.",
        ],
      },
      {
        kind: "list",
        title: "// how it plays",
        items: [
          "Kill a player → you gain 1 balance and get stronger buffs",
          "Die → you lose 1 balance and pick up nasty debuffs",
          "Fall below the limit → you're death-banned from the server",
          "Craft an Elixir of Renewal → drink it to recover balance or clear debuffs",
          "Craft a Revive Book with an Elixir → use it to bring a banned friend back",
          "Everyone's balance shows live on the scoreboard and in the tab list",
        ],
      },
      {
        kind: "images",
        title: "// crafting recipes",
        images: [
          { src: `${M}/data/PayOzDCD/images/60e0845a1c7b165f6117cb2c916e5ba1edbc8c79.png`, alt: "Elixir of Renewal recipe" },
          { src: `${M}/data/PayOzDCD/images/6ab370b6e6b74b310c65be008d0c0786d6b5dfac_350.webp`, alt: "Revive Book recipe" },
        ],
      },
      {
        kind: "table",
        title: "// admin commands",
        headers: ["Command", "What it does"],
        rows: [
          ["/ps balance [player]", "Check anyone's balance"],
          ["/ps setbalance <player> <value>", "Set a player's balance"],
          ["/ps giveelixir <player> [amount]", "Hand out Elixirs of Renewal"],
          ["/ps giverevivebook <player> [amount]", "Hand out Revive Books"],
          ["/ps immunity <player> <on|off>", "Make a player immune to losing balance"],
          ["/ps revive <player>", "Unban a death-banned player"],
        ],
      },
      {
        kind: "note",
        tone: "info",
        body:
          "Almost everything is tweakable in the config: starting balance, ban threshold, warning messages, tab-list format and more. After editing, restart the server to apply changes.",
      },
    ],
  },
  {
    slug: "ender-recipes",
    name: "Ender Recipes",
    tagline:
      "Craft an Elytra and Shulker Boxes before ever fighting the Ender Dragon — perfect for survival servers.",
    logo: "/logos/ender-recipes.png",
    mcVersions: "Minecraft 1.21 – 1.21.3",
    license: "MIT (open source)",
    downloads: 302,
    status: "active",
    githubUrl: "https://github.com/vihaanvp/Ender-Recipes",
    modrinthUrl: "https://modrinth.com/mod/ender-recipes",
    highlights: [
      "Craftable Elytra & Shulker Boxes",
      "Vanilla items — no custom stuff",
      "Toggle each recipe on/off",
    ],
    sections: [
      {
        kind: "text",
        body: [
          "On most servers the best items — the Elytra and Shulker Boxes — are locked away behind the Ender Dragon fight. Ender Recipes changes that: both become craftable with expensive-but-fair ingredients, so players can work towards them early.",
          "Everything you craft is 100% vanilla. An Elytra from this plugin flies exactly like a normal one — because it is one.",
        ],
      },
      {
        kind: "table",
        title: "// the recipes",
        headers: ["Item", "Recipe"],
        rows: [
          ["Shulker Box", "8 Obsidian around 1 Chest"],
          ["Elytra", "1 Netherite Block center, 4 Diamond Blocks in a cross, 4 Totems of Undying in the corners"],
        ],
      },
      {
        kind: "images",
        title: "// recipe previews",
        images: [
          { src: `${M}/data/Jt1gJXF1/images/6f1643289ac15d56bed0c087429d6a4b282284ab_350.webp`, alt: "Shulker Box recipe" },
          { src: `${M}/data/Jt1gJXF1/images/6c9a3771886dc7a07168060c7a8e6a71f781e8f3_350.webp`, alt: "Elytra recipe" },
        ],
      },
      {
        kind: "list",
        title: "// good to know",
        items: [
          "Each recipe can be switched on or off in the config file",
          "Recipes are ready the moment the server starts — nothing to set up",
          "Works on PaperMC, Spigot, Purpur and similar server types",
          "Tested on Minecraft 26.1.2 and 1.21.8 (should also work on other 1.21+)",
        ],
      },
    ],
  },
  {
    slug: "decapitator",
    name: "Decapitator",
    tagline:
      "Let players collect heads — including their own! Just run /head. Optional limits included.",
    logo: "/logos/decapitator.png",
    mcVersions: "Minecraft 26.1.2",
    license: "MIT (open source)",
    downloads: 15,
    status: "active",
    githubUrl: "https://github.com/vihaanvp/Decapitator",
    modrinthUrl: "https://modrinth.com/plugin/head-decapitator",
    highlights: [
      "/head gives you any player's head",
      "Optional per-player limit",
      "Works with SkinsRestorer servers",
    ],
    sections: [
      {
        kind: "text",
        body: [
          "Player heads are a fun way to decorate bases, build trophy walls or trade — but collecting them in vanilla is tedious. Decapitator adds one simple command: /head gives you your own head instantly, and /head <player> gets anyone else's.",
          "Server owners can cap how many heads each player can claim (or leave it unlimited — that's the default). Counts are remembered even after restarts.",
        ],
      },
      {
        kind: "list",
        title: "// features",
        items: [
          "/head — get your own head, free of charge",
          "/head <player> — grab another player's head (admins only by default)",
          "/head count — check how many heads you've claimed",
          "Set a limit per player in the config, or allow unlimited",
          "If your inventory is full, the head drops at your feet instead of disappearing",
          "Runs great alongside SkinsRestorer — skins look correct even on offline-mode servers",
        ],
      },
      {
        kind: "table",
        title: "// commands",
        headers: ["Command", "Who can use it", "What it does"],
        rows: [
          ["/head", "Everyone", "Get your own head"],
          ["/head <player>", "Admins", "Get another player's head"],
          ["/head count [player]", "You / Admins", "View head counts"],
          ["/head reload", "Admins", "Apply config changes without restarting"],
        ],
      },
      {
        kind: "note",
        tone: "info",
        body:
          "One config option, two settings: turn the plugin on/off and choose the max heads per player (-1 means unlimited). That's it!",
      },
    ],
  },
  {
    slug: "bone-to-bone-block",
    name: "Bone to Bone Block",
    tagline:
      "Turn 9 bones into 1 bone block — and back again. Tiny quality-of-life fix for hoarders and builders.",
    logo: "/logos/bone-to-bone-block.png",
    mcVersions: "Minecraft 26.1.2",
    license: "MIT (open source)",
    downloads: 16,
    status: "active",
    githubUrl: "https://github.com/vihaanvp/Bone-to-Bone-Block",
    modrinthUrl: "https://modrinth.com/mod/bone-to-bone-block",
    highlights: [
      "Compress bones into blocks",
      "Decompress blocks into bones",
      "Zero setup — install & play",
    ],
    sections: [
      {
        kind: "text",
        body: [
          "Skeleton farms produce bones by the thousands, and 64-per-stack storage fills chests fast. Bone to Bone Block adds the missing reversible recipe: compress 9 bones into a single bone block, then split it back into 9 bones whenever you need them.",
          "There's nothing to learn and nothing to configure — if you can craft, you can use it.",
        ],
      },
      {
        kind: "table",
        title: "// the recipes",
        headers: ["Direction", "How"],
        rows: [
          ["Compress", "Fill a 3×3 crafting grid with Bones → get 1 Bone Block"],
          ["Decompress", "Place a Bone Block anywhere in a crafting grid → get 9 Bones back"],
        ],
      },
      {
        kind: "list",
        title: "// why players love it",
        items: [
          "Bone blocks store 9× more bones per chest slot",
          "Split them apart again instantly for trading, bonemeal or crafting",
          "No commands, no permissions — works for everyone on the server automatically",
          "Removes itself cleanly when uninstalled, leaving no broken recipes behind",
        ],
      },
    ],
  },
];
