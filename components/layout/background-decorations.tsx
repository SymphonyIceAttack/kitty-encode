export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-ghibli-sky/5 via-transparent to-ghibli-forest/5" />
      <svg
        className="absolute top-20 left-[10%] w-32 h-16 text-ghibli-sky/20"
        viewBox="0 0 120 50"
      >
        <ellipse cx="35" cy="30" rx="25" ry="15" fill="currentColor" />
        <ellipse cx="60" cy="25" rx="30" ry="18" fill="currentColor" />
        <ellipse cx="85" cy="30" rx="25" ry="15" fill="currentColor" />
      </svg>
      <svg
        className="absolute top-40 right-[15%] w-24 h-12 text-ghibli-sky/15"
        viewBox="0 0 120 50"
      >
        <ellipse cx="35" cy="30" rx="25" ry="15" fill="currentColor" />
        <ellipse cx="60" cy="25" rx="30" ry="18" fill="currentColor" />
        <ellipse cx="85" cy="30" rx="25" ry="15" fill="currentColor" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 right-0 h-32 text-ghibli-forest/10"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 Q200,40 400,70 T800,50 T1200,80 L1200,100 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
