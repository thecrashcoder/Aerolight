import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  id?: string;
  city: string;
  country: string;
  image: string;
  price: number;
}

export function DestinationCard({ id, city, country, image, price }: DestinationCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Link 
      to={`/destination/${id || city.toLowerCase().replace(' ', '-')}`}
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer block"
    >
      <div className="absolute inset-0 bg-ink-900">
        <img 
          src={image} 
          alt={city} 
          className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
      
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-sm font-medium">
        from ${price}
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-medium tracking-tight text-white mb-1">{city}</h3>
          <p className="text-sm text-white/60">{country}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 transform translate-x-[-10px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
          <ArrowRight size={18} className="text-white" />
        </div>
      </div>
    </Link>
  );
}

