// Ambient motion signature for the Hero: a slow rising steam curl, the one thing
// a fresh cup of coffee actually does. Purely decorative motion, frozen under
// prefers-reduced-motion via the global override in globals.css.
export default function SteamWisp({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 120"
      className={`pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M20 110C20 110 8 92 20 76C32 60 8 46 20 30C32 14 16 6 16 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="steam-wisp steam-wisp-1"
      />
      <path
        d="M40 110C40 110 28 95 40 80C52 65 30 52 40 38C50 24 36 10 36 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="steam-wisp steam-wisp-2"
      />
    </svg>
  );
}
