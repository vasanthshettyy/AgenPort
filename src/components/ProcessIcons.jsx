import { cn } from '../lib/utils';

export function MessageSquareMoreIcon({ className, size = 28, ...props }) {
  return (
    <div className={cn('text-content-accent', className)} {...props}>
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle
          cx="8"
          cy="10"
          r="1"
          className="fill-current transition-opacity duration-300 group-hover:animate-[dotPulse_1.2s_ease-in-out_infinite]"
        />
        <circle
          cx="12"
          cy="10"
          r="1"
          className="fill-current transition-opacity duration-300 group-hover:animate-[dotPulse_1.2s_ease-in-out_0.2s_infinite]"
        />
        <circle
          cx="16"
          cy="10"
          r="1"
          className="fill-current transition-opacity duration-300 group-hover:animate-[dotPulse_1.2s_ease-in-out_0.4s_infinite]"
        />
      </svg>
    </div>
  );
}

export function LayoutPanelTopIcon({ className, size = 28, ...props }) {
  return (
    <div className={cn('text-content-accent', className)} {...props}>
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="7"
          rx="1"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:stroke-cyan-300"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
        />
      </svg>
    </div>
  );
}

export function TerminalIcon({ className, size = 28, ...props }) {
  return (
    <div className={cn('text-content-accent', className)} {...props}>
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <polyline points="4 17 10 11 4 5" />
        <line
          x1="12"
          x2="20"
          y1="19"
          y2="19"
          className="transition-opacity duration-200 group-hover:animate-[terminalBlink_0.8s_steps(2,start)_infinite]"
        />
      </svg>
    </div>
  );
}

export function RocketIcon({ className, size = 28, ...props }) {
  return (
    <div className={cn('text-content-accent', className)} {...props}>
      <svg
        fill="none"
        height={size}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible transition-transform duration-300 group-hover:animate-[rocketWobble_2s_ease-in-out_infinite]"
      >
        <path
          d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
          className="origin-bottom-left transition-transform duration-200 group-hover:animate-[flameFlicker_0.4s_ease-in-out_infinite_alternate]"
        />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    </div>
  );
}
