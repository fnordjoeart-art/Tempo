interface TempoLogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: string;
  showPlus?: boolean;
}

export function TempoLogo({ size = 'large', className = '', showPlus = true }: TempoLogoProps) {
  const sizes = {
    small: { fontSize: '24px', plusSize: '16px', spacing: '4px' },
    medium: { fontSize: '36px', plusSize: '24px', spacing: '6px' },
    large: { fontSize: '56px', plusSize: '32px', spacing: '8px' },
    xlarge: { fontSize: '72px', plusSize: '42px', spacing: '10px' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`inline-flex items-center ${className}`}>
      {/* SVG Logo */}
      <svg 
        viewBox="0 0 300 120" 
        className="w-full h-auto"
        style={{ maxWidth: '300px' }}
      >
        {/* TEMPO text */}
        <text
          x="150"
          y="70"
          textAnchor="middle"
          className="fill-white"
          style={{ 
            fontSize: currentSize.fontSize, 
            fontWeight: 'bold',
            letterSpacing: '2px',
          }}
        >
          TEMPO
        </text>

        {/* + symbol with gradient */}
        {showPlus && (
          <>
            <defs>
              <linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <text
              x="260"
              y="70"
              textAnchor="middle"
              fill="url(#plusGradient)"
              style={{ 
                fontSize: currentSize.plusSize, 
                fontWeight: 'bold',
                letterSpacing: currentSize.spacing,
              }}
            >
              +
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
