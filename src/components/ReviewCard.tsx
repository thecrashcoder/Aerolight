import { Star, Quote } from 'lucide-react';

interface ReviewCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export function ReviewCard({ quote, name, role, avatar }: ReviewCardProps) {
  return (
    <div className="bg-ink-700/60 backdrop-blur-xl border border-hairline rounded-2xl p-8 flex flex-col h-full relative">
      <div className="absolute top-8 right-8 text-azure-300/20 pointer-events-none">
        <Quote size={48} />
      </div>
      
      <div className="flex gap-1 mb-6 text-star">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={16} fill="currentColor" />
        ))}
      </div>
      
      <p className="text-body-lg text-white/90 mb-8 flex-1 font-light leading-relaxed">
        "{quote}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-hairline" />
        <div>
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-white/50">{role}</p>
        </div>
      </div>
    </div>
  );
}
