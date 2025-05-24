import bgmultigamopen from '@/public/bgmultigamopen.png'
import multigamelogo from '@/public/multigamelogo.png'
import manhattanMain from '../public/multigames/Multigames/Manhattan/MANHATTAN.jpg'
import championsMain from '../public/multigames-pagis/Card/Champions Slot.jpg'
import fortuneUltralinkMain from '../public/multigames-pagis/Card/Fortune.jpg'
import diamanteMain from '../public/multigames-pagis/Card/Diamante.jpg'
import piggyGoldMain from '../public/multigames-pagis/Card/Piggy Gold.jpg'
import casinoRoyaleMain from '../public/multigames-pagis/Card/Casino Royale.jpg'
import circusMain from '../public/multigames-pagis/Card/Circus.jpg'
import rubinoMain from '../public/multigames-pagis/Card/Rubino.jpg'
import zaffiroMain from '../public/multigames-pagis/Card/Zaffiro.jpg'
import goldenClubMain from '../public/multigames-pagis/Card/Golden Club - Oro.jpg'
import luckySlotMain from '../public/multigames-pagis/Card/Lucky Slots.jpg'



import { games } from './allgamesmap'

export const multigames = [
    {
        id: 14,
        slug: "manhattan",
        title: "Manhattan",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: manhattanMain,
        video: "https://files.catbox.moe/6d4v6k.mp4",
        description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 10,
        slug: "champions-slot",
        title: "Champions",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: championsMain,
        video: "https://files.catbox.moe/e8dqw8.mp4",
        description: "Sistema sportivo con 8 giochi a tema calcio, perfetto per gli appassionati di sport.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 13,
        slug: "fortune-ultralink",
        title: "Fortune Ultralink",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: fortuneUltralinkMain,
        video: "https://files.catbox.moe/ktlzt8.mp4",
        description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 2,
        slug: "diamante",
        title: "Diamante Multigame",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: diamanteMain,
        video: "https://files.catbox.moe/du9st4.mp4",
        description: "La nostra soluzione premium con 12 giochi esclusivi, grafica HD e funzionalità bonus avanzate.",
        videos: [
            "https://files.catbox.moe/mx9cy6.mp4",
            "https://files.catbox.moe/8umbgu.mp4",
            "https://files.catbox.moe/ykr73i.mp4",
            "https://files.catbox.moe/wpxen9.mp4",
            "https://files.catbox.moe/6di38y.mp4",
            "https://files.catbox.moe/duq7o3.mp4"
        ],
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],
        recommended: ["casino-royale", "golden-club", "piggy-gold"]
    },
    {
        id: 4,
        slug: "piggy-gold",
        title: "Piggy Gold Multigame",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: piggyGoldMain,
        video: "https://files.catbox.moe/wwptcc.mp4",
        description: "Divertente sistema con 10 giochi a tema denaro e fortuna, perfetto per un pubblico giovane.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
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
        id: 1,
        slug: "casino-royale",
        title: "Casino Royale",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: casinoRoyaleMain,
        video: "https://files.catbox.moe/u2755e.mp4",
        description: "Sistema multigame con 10 giochi a tema casinò classico, interfaccia elegante e jackpot progressivo.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
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
        id: 8,
        slug: "circus",
        title: "Circus",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: circusMain,
        video: "https://files.catbox.moe/609t67.mp4",
        description: "Sistema divertente con 10 giochi a tema circo, perfetto per un pubblico giovane e dinamico.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 5,
        slug: "rubino",
        title: "Rubino",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: rubinoMain,
        video: "https://files.catbox.moe/c7g4z7.mp4",
        description: "Multigame con 6 giochi premium, grafica vibrante e funzionalità bonus esclusive.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
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
        mainImage: zaffiroMain,
        video: "https://files.catbox.moe/73mdoy.mp4",
        description: "Sistema elegante con 8 giochi a tema gemme, effetti visivi spettacolari e alta percentuale di vincita.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'braccio-di-ferro')!,
            games.find(g => g.slug === 'scacco-matto')!,
            games.find(g => g.slug === 'lo-struzzo')!,
            games.find(g => g.slug === 'reggae-frog')!,
            games.find(g => g.slug === 'striptease')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 3,
        slug: "golden-club",
        title: "Golden Club",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: goldenClubMain,
        video: "https://files.catbox.moe/yr12je.mp4",
        description: "Esperienza VIP con 8 giochi selezionati, tema lussuoso e meccaniche di gioco innovative.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
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
        id: 12,
        slug: "lucky-slot",
        title: "Lucky Slot",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: luckySlotMain,
        video: "https://files.catbox.moe/qc006a.mp4",
        description: "Sistema con 8 giochi a tema fortuna, grafica accattivante e funzionalità bonus esclusive.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],        
        recommended: ["casino-royale", "diamante", "golden-club"]
    }
]
