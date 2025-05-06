import Image from 'next/image';
import React from 'react';
import logomagic from '../public/logo-magic.svg';
import magicbg from '../public/magic-diamond-bg.png';
import { Play } from 'lucide-react';

export default function MagicDiamondSection() {
  return (
    <div className="w-full min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Container principale */}
        <div className="flex flex-col md:flex-row">
          {/* Contenuto principale (molto più largo su desktop) */}
          <div className="flex flex-col items-start md:w-4/5">
            {/* Logo in alto a sinistra */}
            <div className="mb-3">
              <Image src={logomagic} alt="logo" className='w-3/4' />
            </div>
            
            {/* Descrizione sotto il logo */}
            <p className="text-xs font-light text-white max-w-2xl text-left mb-4">
              Scopri l'energia scintillante di Mr. Diamond, la slot dove ogni spin può attivare
              bonus esplosivi! Raccogli diamanti blu e rossi, sblocca giri gratuiti e
              scegli gemme misteriose per vincite moltiplicate fino a 2000x.
              Con il Buy Bonus, entri subito nell'azione.
              E grazie ad Autoplay e Quick Spin, il ritmo non si ferma mai!
            </p>
            
            {/* Container per immagine e bottone in orizzontale su desktop */}
            <div className="w-full flex flex-col md:flex-row md:items-center">
              {/* Immagine rettangolare con bordi arrotondati */}
              <div className="w-full md:w-2/3 mt-2">
                <div className="w-full rounded-xl overflow-hidden">
                  <Image 
                    src={magicbg} 
                    alt="Magic Diamond 2"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
              
              {/* Bottone a destra dell'immagine, staccato e centrato verticalmente */}
              <div className=" flex flex-col items-start gap-4 mt-4 md:mt-0 md:ml-16 md:flex ">
                <p className='text-xl font-bold text-white'>Provala ora</p>
                <button className="flex flex-row items-center gap-2 bg-black border border-1 border-white text-white text-white font-medium py-3 px-6 rounded-full  w-full md:w-auto">
                    <Play className='w-4 h-4' />
                  Gioca Ora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}