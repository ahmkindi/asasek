import React from 'react'

const Pattern = () => {
  return (
    <div className="absolute inset-0 opacity-8">
      <svg className="w-full h-full" viewBox="0 0 400 400">
        <defs>
          {/* 8-pointed star (Khatam) pattern */}
          <pattern id="islamicStar" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <g transform="translate(60,60)">
              {/* Outer 8-pointed star */}
              <polygon
                points="0,-40 12,-12 40,0 12,12 0,40 -12,12 -40,0 -12,-12"
                fill="none"
                stroke="#8B4513"
                strokeWidth="1.5"
                opacity="0.6"
              />
              {/* Inner square */}
              <rect
                x="-15" y="-15"
                width="30" height="30"
                fill="none"
                stroke="#D2691E"
                strokeWidth="1"
                opacity="0.5"
                transform="rotate(45)"
              />
              {/* Central circle */}
              <circle
                cx="0" cy="0" r="8"
                fill="none"
                stroke="#CD853F"
                strokeWidth="1"
                opacity="0.7"
              />
            </g>
          </pattern>

          {/* Interlacing geometric pattern */}
          <pattern id="interlacePattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <g transform="translate(40,40)">
              {/* Hexagonal base */}
              <polygon
                points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15"
                fill="none"
                stroke="#A0522D"
                strokeWidth="1"
                opacity="0.4"
              />
              {/* Interlacing lines */}
              <path
                d="M-30,0 L30,0 M-15,-26 L15,26 M-15,26 L15,-26"
                stroke="#8B4513"
                strokeWidth="0.8"
                opacity="0.5"
              />
              {/* Small decorative elements */}
              <circle cx="0" cy="0" r="3" fill="#D2691E" opacity="0.6" />
            </g>
          </pattern>

          {/* Arabesque flowing pattern */}
          <pattern id="arabesquePattern" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <g transform="translate(80,80)">
              {/* Curved flowing lines */}
              <path
                d="M-60,-60 Q-30,-30 0,-60 Q30,-30 60,-60 Q30,0 60,0 Q30,30 60,60 Q30,30 0,60 Q-30,30 -60,60 Q-30,0 -60,0 Q-30,-30 -60,-60 Z"
                fill="none"
                stroke="#CD853F"
                strokeWidth="1.2"
                opacity="0.3"
              />
              {/* Inner flowing pattern */}
              <path
                d="M-40,-40 Q-20,-20 0,-40 Q20,-20 40,-40 Q20,0 40,0 Q20,20 40,40 Q20,20 0,40 Q-20,20 -40,40 Q-20,0 -40,0 Q-20,-20 -40,-40 Z"
                fill="none"
                stroke="#B8860B"
                strokeWidth="0.8"
                opacity="0.4"
              />
            </g>
          </pattern>

          {/* Islamic calligraphy-inspired pattern */}
          <pattern id="calligraphyPattern" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
            <g transform="translate(100,50)">
              {/* Stylized calligraphic curves */}
              <path
                d="M-80,0 Q-60,-20 -40,0 Q-20,20 0,0 Q20,-20 40,0 Q60,20 80,0"
                fill="none"
                stroke="#8B4513"
                strokeWidth="2"
                opacity="0.2"
              />
              <path
                d="M-80,0 Q-60,20 -40,0 Q-20,-20 0,0 Q20,20 40,0 Q60,-20 80,0"
                fill="none"
                stroke="#CD853F"
                strokeWidth="1.5"
                opacity="0.25"
                transform="translate(0,10)"
              />
            </g>
          </pattern>
        </defs>

        {/* Layer the patterns */}
        <rect width="100%" height="100%" fill="url(#islamicStar)" />
        <rect width="100%" height="100%" fill="url(#interlacePattern)" />
        <rect width="100%" height="100%" fill="url(#arabesquePattern)" />
        <rect width="100%" height="100%" fill="url(#calligraphyPattern)" />
      </svg>
    </div>
  )
}

export default Pattern
