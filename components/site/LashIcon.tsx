import { useId } from 'react';

/**
 * The menu button's icon: a closed, lashed eye that opens into a bronze iris
 * when the menu opens. Pure SVG + CSS (see `.lash-icon` in globals.css), so it
 * costs no images or JavaScript animation, and reduced motion swaps states instantly.
 */
export function LashIcon({ open, className = '' }: { open: boolean; className?: string }) {
  const gradientId = `lash-iris-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg
      viewBox="0 0 48 48"
      className={`lash-icon ${className}`}
      data-open={open ? 'true' : 'false'}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={gradientId} cx="40%" cy="38%" r="70%">
          <stop offset="0" stopColor="#fff1d1" />
          <stop offset=".35" stopColor="#e8cf95" />
          <stop offset="1" stopColor="#8a5a2b" />
        </radialGradient>
      </defs>
      <g className="lash-closed">
        <path d="M9 22 Q24 31 39 22" />
        <path d="M15 24.9 L13.2 28.2 M19.5 26.1 L18.8 29.8 M24 26.5 V30.3 M28.5 26.1 L29.2 29.8 M33 24.9 L34.8 28.2" />
      </g>
      <g className="lash-open">
        <path d="M7 24 Q24 9 41 24 Q24 37 7 24 Z" />
        <circle cx="24" cy="24" r="6.4" fill={`url(#${gradientId})`} stroke="none" />
        <circle cx="24" cy="24" r="2.5" fill="#0e0b09" stroke="none" />
        <path d="M13.8 19.2 L11.4 16 M18.9 17.2 L17.8 13.4 M24 16.5 V12.5 M29.1 17.2 L30.2 13.4 M34.2 19.2 L36.6 16" />
      </g>
      <circle className="lash-glint" cx="26" cy="21.8" r="1.2" fill="#fff5dd" stroke="none" />
    </svg>
  );
}
