import bgmultigamopen from '@/public/bgmultigamopen.png'
import multigamelogo from '@/public/multigamelogo.png'
import manhattanMain from '../public/multigames-pagis/Card/Manhattan.webp'
import championsMain from '../public/multigames-pagis/Card/Champions Slot.webp'
import fortuneUltralinkMain from '../public/multigames-pagis/Card/Fortune.webp'
import diamanteMain from '../public/multigames-pagis/Card/Diamante.webp'
import piggyGoldMain from '../public/multigames-pagis/Card/Piggy Gold.webp'
import casinoRoyaleMain from '../public/multigames-pagis/Card/Casino Royale.webp'
import circusMain from '../public/multigames-pagis/Card/Circus.webp'
import rubinoMain from '../public/multigames-pagis/Card/Rubino.webp'
import zaffiroMain from '../public/multigames-pagis/Card/Zaffiro.webp'
import goldenClubMain from '../public/multigames-pagis/Card/Golden Club - Oro.webp'
import luckySlotMain from '../public/multigames-pagis/Card/Lucky Slots.webp'
import pool4 from '../public/multigames-pagis/Card/Pool4.webp'
import goldenArgento from '../public/multigames-pagis/Card/Golden Club - Argento.webp'
import goldenPlatino from '../public/multigames-pagis/Card/Golden Club - Platino.webp'



import { games } from './allgamesmap'

export const multigames = [
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
            games.find(g => g.slug === 'book-of-magic')!,
            games.find(g => g.slug === 'nautilus')!,
            games.find(g => g.slug === 'pepita-doro')!,
            games.find(g => g.slug === 'jungle')!,
            games.find(g => g.slug === 'golden-fruit')!
        ],
        recommended: ["diamante", "golden-club", "piggy-gold"]
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
            games.find(g => g.slug === 'lo-struzzo')!,
            games.find(g => g.slug === 'cowboy-revenge-2')!,
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'vampiro')!,
            games.find(g => g.slug === 'reggae-frog')!
        ],
        recommended: ["casino-royale", "golden-club", "piggy-gold"]
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
            games.find(g => g.slug === 'pablito')!,
            games.find(g => g.slug === 'hot-pepper')!,
            games.find(g => g.slug === 'braccio-di-ferro')!,
            games.find(g => g.slug === 'zombie')!,
            games.find(g => g.slug === 'lucky-8')!
        ],
        recommended: ["casino-royale", "diamante", "piggy-gold"]
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
            games.find(g => g.slug === 'elfi')!,
            games.find(g => g.slug === 'mexican')!,
            games.find(g => g.slug === 'striptease')!,
            games.find(g => g.slug === 'dragon')!,
            games.find(g => g.slug === 'piggy-gold')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
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
            games.find(g => g.slug === 'striptease')!,
            games.find(g => g.slug === 'alieni')!,
            games.find(g => g.slug === 'il-giullare')!,
            games.find(g => g.slug === 'scacco-matto')!,
            games.find(g => g.slug === 'la-scatola-magica')!
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
            games.find(g => g.slug === 'the-time')!,
            games.find(g => g.slug === 'il-barone-rosso')!,
            games.find(g => g.slug === 'il-cuoco')!,
            games.find(g => g.slug === 'mohamed')!,
            games.find(g => g.slug === 'dragon')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 7,
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
        games: [],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 8,
        slug: "champions",
        title: "Champions",
        coverImage: bgmultigamopen,
        logo: multigamelogo,
        mainImage: championsMain,
        video: "https://files.catbox.moe/bajs3j.mp4",
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
            games.find(g => g.slug === 'crazy-circus')!,
            games.find(g => g.slug === 'pepita-doro')!,
            games.find(g => g.slug === 'fortune')!,
            games.find(g => g.slug === 'dolphins')!,
            games.find(g => g.slug === 'luxury')!,
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 9,
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
            games.find(g => g.slug === 'excalibur')!,
            games.find(g => g.slug === 'minotaurus')!,
            games.find(g => g.slug === 'dolphins')!,
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 10,
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
            games.find(g => g.slug === 'the-weird-family')!,
            games.find(g => g.slug === 'dark-pirates')!,
            games.find(g => g.slug === 'luxury')!,
            games.find(g => g.slug === 'fortune')!,
            games.find(g => g.slug === 'mexican')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 11,
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
            games.find(g => g.slug === 'shark')!,
            games.find(g => g.slug === 'le-chef')!,
            games.find(g => g.slug === 'magic-diamond-2')!,
            games.find(g => g.slug === 'cherry')!,
            games.find(g => g.slug === 'midnight-saloon')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 12,
        slug: "golden-club-argento",
        title: "Golden CLub Argento",
        coverImage: goldenArgento,
        logo: multigamelogo,
        mainImage: goldenArgento,
        description: "Sistema premium con 10 giochi esclusivi, grafica HD e funzionalità bonus avanzate.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 13,
        slug: "golden-club-platino",
        title: "Golden CLub Platino",
        coverImage: goldenPlatino,
        logo: multigamelogo,
        mainImage: goldenPlatino,
        description: "Sistema premium con 10 giochi esclusivi, grafica HD e funzionalità bonus avanzate.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'eden')!,
            games.find(g => g.slug === 'torero')!,
            games.find(g => g.slug === 'sonny-bono')!,
            games.find(g => g.slug === 'golden-slot')!,
            games.find(g => g.slug === 'il-grillo')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    },
    {
        id: 14,
        slug: "pool-4",
        title: "Pool 4",
        coverImage: pool4,
        logo: multigamelogo,
        mainImage: pool4,
        description: "Sistema con 8 giochi a tema gemme, effetti visivi spettacolari e alta percentuale di vincita.",
        videos: [
            "https://example.com/video1.mp4",
            "https://example.com/video2.mp4",
            "https://example.com/video3.mp4",
            "https://example.com/video4.mp4",
            "https://example.com/video5.mp4",
            "https://example.com/video6.mp4"
        ],
        games: [
            games.find(g => g.slug === 'pablito')!,
            games.find(g => g.slug === 'il-grillo')!,
            games.find(g => g.slug === 'julio')!,
            games.find(g => g.slug === 'lucky-8')!
        ],
        recommended: ["casino-royale", "diamante", "golden-club"]
    }
]
