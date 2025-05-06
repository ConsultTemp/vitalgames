import bgmultigamopen from '@/public/bgmultigamopen.png'
import multigamelogo from '@/public/multigamelogo.png'
import { games } from './allgamesmap'

export const multigames = [
    {
        id: 1,
        slug: "casino-royale",
        title: "Casino Royale",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        description: "Un'esperienza di gioco unica nel suo genere",
        games: [
            games.find(g => g.slug === 'fortune')!,
            games.find(g => g.slug === 'billionaire')!,
            games.find(g => g.slug === 'golden-fruit')!,
            games.find(g => g.slug === 'pepita-doro')!,
            games.find(g => g.slug === 'lucky-8')!
        ],
        recommended: ["diamante", "golden-club", "piggy-gold"]
    },
    {
        id: 2,
        slug: "diamante",
        title: "Diamante Multigame",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        description: "Brilla come un diamante",
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'la-scatola-magica')!,
            games.find(g => g.slug === 'book-of-magic')!,
            games.find(g => g.slug === 'elfi')!,
            games.find(g => g.slug === 'eden')!
        ],
        recommended: ["casino-royale", "golden-club", "piggy-gold"]
    },
    {
        id: 3,
        slug: "golden-club",
        title: "Golden Club",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        description: "L'esclusività del gioco d'oro",
        games: [
            games.find(g => g.slug === 'il-barone-rosso')!,
            games.find(g => g.slug === 'dragon')!,
            games.find(g => g.slug === 'alieni')!,
            games.find(g => g.slug === 'nautilus')!,
            games.find(g => g.slug === 'zombie')!
        ],
        recommended: ["casino-royale", "diamante", "piggy-gold"]
    },
    {
        id: 4,
        slug: "piggy-gold",
        title: "Piggy Gold Multigame",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        description: "La fortuna è nel maialino",
        games: [
            games.find(g => g.slug === 'il-cuoco')!,
            games.find(g => g.slug === 'il-giullare')!,
            games.find(g => g.slug === 'il-grillo')!,
            games.find(g => g.slug === 'pablito')!,
            games.find(g => g.slug === 'sonny-bono')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 5,
        slug: "rubino",
        title: "Rubino",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        description: "Il rosso della fortuna",
        games: [
            games.find(g => g.slug === 'cowboy-revenge-2')!,
            games.find(g => g.slug === 'mexican')!,
            games.find(g => g.slug === 'julio')!,
            games.find(g => g.slug === 'torero')!,
            games.find(g => g.slug === 'dark-pirates')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 6,
        slug: "zaffiro",
        title: "Zaffiro",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        description: "Il blu della fortuna",
        games: [
            games.find(g => g.slug === 'braccio-di-ferro')!,
            games.find(g => g.slug === 'scacco-matto')!,
            games.find(g => g.slug === 'lo-struzzo')!,
            games.find(g => g.slug === 'reggae-frog')!,
            games.find(g => g.slug === 'striptease')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    }
]
