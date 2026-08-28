import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export interface EcellLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero' | number;
  variant?: 'default' | 'glow' | 'neon' | 'cyber' | 'minimal' | 'solar' | 'emerald';
  animated?: boolean;
  interactive?: boolean;
  showText?: boolean;
  className?: string;
  onClick?: () => void;
  onLaunch?: () => void;
  isLaunching?: boolean;
}

export const EcellLogo: React.FC<EcellLogoProps> = ({
  size = 'md',
  variant = 'glow',
  animated = true,
  interactive = true,
  showText = true,
  className = '',
  onClick,
  onLaunch,
  isLaunching = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [internalLaunching, setInternalLaunching] = useState(false);

  const activeLaunching = isLaunching || internalLaunching;

  // 3D Magnetic Parallax Cursor Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = (clientX / width) - 0.5;
    const yPct = (clientY / height) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Convert size to numeric pixels
  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'xs': return 28;
      case 'sm': return 36;
      case 'md': return 48;
      case 'lg': return 64;
      case 'xl': return 96;
      case '2xl': return 140;
      case 'hero': return 240;
      default: return 48;
    }
  };

  const dim = getDimension();

  // Color schemes based on variant
  const getPalette = () => {
    switch (variant) {
      case 'neon':
        return {
          stroke: '#60A5FA',
          accent: '#C084FC',
          glow: 'rgba(96, 165, 250, 0.6)',
          thrust: '#38BDF8',
          text: '#F8FAFC',
          ringGrad: ['#38BDF8', '#818CF8', '#C084FC']
        };
      case 'solar':
        return {
          stroke: '#FBBF24',
          accent: '#F97316',
          glow: 'rgba(251, 191, 36, 0.6)',
          thrust: '#EF4444',
          text: '#FEF3C7',
          ringGrad: ['#F59E0B', '#EF4444', '#FBBF24']
        };
      case 'emerald':
        return {
          stroke: '#34D399',
          accent: '#10B981',
          glow: 'rgba(52, 211, 153, 0.6)',
          thrust: '#06B6D4',
          text: '#ECFDF5',
          ringGrad: ['#10B981', '#06B6D4', '#6EE7B7']
        };
      case 'cyber':
        return {
          stroke: '#22D3EE',
          accent: '#F43F5E',
          glow: 'rgba(34, 211, 238, 0.6)',
          thrust: '#E11D48',
          text: '#FFFFFF',
          ringGrad: ['#22D3EE', '#818CF8', '#F43F5E']
        };
      case 'minimal':
        return {
          stroke: '#E2E8F0',
          accent: '#94A3B8',
          glow: 'rgba(255, 255, 255, 0.2)',
          thrust: '#CBD5E1',
          text: '#FFFFFF',
          ringGrad: ['#FFFFFF', '#94A3B8', '#FFFFFF']
        };
      case 'glow':
      default:
        return {
          stroke: '#FFFFFF',
          accent: '#818CF8',
          glow: 'rgba(99, 102, 241, 0.5)',
          thrust: '#6366F1',
          text: '#FFFFFF',
          ringGrad: ['#FFFFFF', '#818CF8', '#C084FC']
        };
    }
  };

  const palette = getPalette();

  const handleLaunchTrigger = () => {
    if (onClick) onClick();
    if (!activeLaunching) {
      setInternalLaunching(true);
      if (onLaunch) onLaunch();
      setTimeout(() => {
        setInternalLaunching(false);
      }, 1600);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleLaunchTrigger}
      style={{
        width: dim,
        height: dim,
        perspective: 800,
        transformStyle: 'preserve-3d'
      }}
      className={`relative select-none flex items-center justify-center shrink-0 ${interactive ? 'cursor-pointer' : ''} ${className}`}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d'
        }}
        animate={activeLaunching ? {
          scale: [1, 1.15, 0.95, 1],
          transition: { duration: 1.2 }
        } : {}}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Dynamic Background Glow Halo */}
        {variant !== 'minimal' && (
          <div
            className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300 ${
              isHovered || activeLaunching ? 'opacity-90' : 'opacity-40'
            }`}
            style={{
              background: `radial-gradient(circle, ${palette.glow} 0%, rgba(0,0,0,0) 70%)`
            }}
          />
        )}

        {/* Orbiting Photon particle */}
        {animated && (
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: activeLaunching ? 1.5 : 8,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="w-1.5 h-1.5 rounded-full shadow-lg"
              style={{
                backgroundColor: palette.stroke,
                boxShadow: `0 0 8px 2px ${palette.stroke}`,
                position: 'absolute',
                top: '6%',
                left: '48%'
              }}
            />
          </motion.div>
        )}

        {/* SVG Vector Asset Exact Representation */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Linear gradient for stroke */}
            <linearGradient id={`ecell-grad-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={palette.ringGrad[0]} />
              <stop offset="50%" stopColor={palette.ringGrad[1]} />
              <stop offset="100%" stopColor={palette.ringGrad[2]} />
            </linearGradient>

            {/* Glowing filter */}
            <filter id={`ecell-filter-glow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Thrust Flame Gradient */}
            <linearGradient id="thrustGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor={palette.stroke} />
              <stop offset="100%" stopColor={palette.thrust} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. OUTER CIRCULAR ORBITAL RING with Breakout for Rocket Launch */}
          <motion.path
            d="M 170 85 A 190 190 0 1 1 395 310"
            stroke={`url(#ecell-grad-${variant})`}
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={variant !== 'minimal' ? `url(#ecell-filter-glow-${variant})` : undefined}
            initial={{ pathLength: 0.9, opacity: 0.9 }}
            animate={animated ? {
              strokeDashoffset: isHovered || activeLaunching ? [0, -30, 0] : [0, -10, 0],
              opacity: [0.85, 1, 0.85]
            } : {}}
            transition={{
              duration: activeLaunching ? 0.8 : 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 2. EXHAUST CLOUD BILLOWS (Bottom Left) */}
          <g className="ecell-cloud">
            {/* Cluster of billowy exhaust smoke curves */}
            <motion.path
              d="M 68 220 
                 C 55 240, 52 270, 72 290 
                 C 60 310, 68 340, 95 352 
                 C 90 375, 115 400, 145 395 
                 C 165 410, 195 405, 205 385 
                 C 220 375, 222 355, 212 340 
                 C 200 325, 185 328, 175 320 
                 C 165 305, 155 295, 140 285 
                 C 125 270, 110 250, 95 240 
                 C 82 230, 75 225, 68 220 Z"
              stroke={palette.stroke}
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill={variant !== 'minimal' ? 'rgba(255, 255, 255, 0.04)' : 'none'}
              animate={animated ? {
                scale: isHovered || activeLaunching ? [1, 1.05, 0.98, 1] : [1, 1.02, 1],
                opacity: [0.75, 1, 0.75]
              } : {}}
              transition={{
                duration: activeLaunching ? 0.6 : 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Inner cloud texture line */}
            <path
              d="M 105 285 C 115 310, 140 325, 165 315 M 130 350 C 150 365, 175 355, 185 340"
              stroke={palette.stroke}
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* 3. TRAJECTORY LINE FROM EXHAUST TO NOZZLE */}
          <motion.line
            x1="165"
            y1="255"
            x2="235"
            y2="225"
            stroke={palette.stroke}
            strokeWidth="7"
            strokeLinecap="round"
            animate={animated ? {
              opacity: [0.5, 1, 0.5],
              strokeWidth: isHovered || activeLaunching ? [7, 10, 7] : [6, 8, 6]
            } : {}}
            transition={{
              duration: activeLaunching ? 0.4 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 4. ROCKET ASSEMBLY (Propelled diagonally towards top-right at ~32 degrees) */}
          <motion.g
            animate={activeLaunching ? {
              x: [0, 80, -200, 0],
              y: [0, -80, 200, 0],
              scale: [1, 1.25, 0.8, 1],
              transition: { duration: 1.4, times: [0, 0.4, 0.41, 1], ease: "easeInOut" }
            } : isHovered ? {
              x: [0, 4, 0],
              y: [0, -4, 0],
              transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            } : {}}
          >
            {/* Dynamic Plasma Flame Burst behind rocket when launching */}
            {(isHovered || activeLaunching) && (
              <motion.path
                d="M 215 250 L 175 275 L 235 220 Z"
                fill="url(#thrustGrad)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.6, 1, 0.4],
                  scale: activeLaunching ? [1, 1.8, 1] : [1, 1.2, 1]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            )}

            {/* Rocket Thruster Nozzle Ring */}
            <circle
              cx="245"
              cy="225"
              r="12"
              stroke={palette.stroke}
              strokeWidth="7"
              fill={variant !== 'minimal' ? 'rgba(255, 255, 255, 0.15)' : 'none'}
            />

            {/* Rocket Rear Fins (Left & Right Flaps) */}
            {/* Left Fin */}
            <path
              d="M 235 185 C 220 185, 208 195, 205 215 C 218 215, 235 210, 245 200"
              stroke={palette.stroke}
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill={variant !== 'minimal' ? 'rgba(255, 255, 255, 0.08)' : 'none'}
            />

            {/* Right Fin */}
            <path
              d="M 285 240 C 285 258, 275 272, 255 275 C 255 260, 260 245, 270 235"
              stroke={palette.stroke}
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill={variant !== 'minimal' ? 'rgba(255, 255, 255, 0.08)' : 'none'}
            />

            {/* Central Rocket Fuselage Body */}
            <path
              d="M 245 200
                 C 280 170, 350 120, 480 75
                 C 435 205, 385 275, 255 255
                 C 240 245, 238 215, 245 200 Z"
              stroke={palette.stroke}
              strokeWidth="9"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill={variant !== 'minimal' ? 'rgba(10, 15, 30, 0.85)' : 'none'}
              filter={variant !== 'minimal' ? `url(#ecell-filter-glow-${variant})` : undefined}
            />

            {/* "CELL" Embossed Letters inside the Rocket Body aligned diagonally */}
            <g transform="translate(305, 195) rotate(-33)">
              <text
                x="0"
                y="0"
                fill={palette.text}
                fontSize="42"
                fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                fontWeight="900"
                letterSpacing="6"
                stroke={palette.stroke}
                strokeWidth="2.5"
                textAnchor="middle"
                style={{
                  paintOrder: 'stroke fill',
                  fontStretch: 'expanded'
                }}
              >
                CELL
              </text>
            </g>

            {/* Aerodynamic Nose Ridge Line */}
            <line
              x1="390"
              y1="115"
              x2="475"
              y2="78"
              stroke={palette.stroke}
              strokeWidth="4.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </motion.g>

          {/* 5. "SSGMCE" TEXT AT THE BOTTOM EMBLEM */}
          {showText && (
            <g transform="translate(250, 472)">
              <text
                x="0"
                y="0"
                fill={palette.text}
                fontSize="40"
                fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                fontWeight="900"
                letterSpacing="18"
                textAnchor="middle"
                stroke={palette.stroke}
                strokeWidth="2.5"
                style={{
                  paintOrder: 'stroke fill',
                  textTransform: 'uppercase'
                }}
              >
                SSGMCE
              </text>
            </g>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
};
