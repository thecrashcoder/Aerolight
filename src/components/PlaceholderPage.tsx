import { Link } from 'react-router-dom';

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-5 lg:px-10 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">{title}</h1>
      <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto">
        This is a placeholder page. In a real application, this would contain the actual content and functionality for the {title} section.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ring-offset-2 ring-offset-ink-900"
      >
        Return to Home
      </Link>
    </div>
  );
}
