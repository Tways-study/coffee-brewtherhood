// Signature background motif: the ring a cup leaves on paper. Used sparingly
// (one per flat-color section) instead of a generic gradient blob, since it ties
// directly to the cafe rather than reading as decoration for its own sake.
export default function CoffeeRing({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className={`coffee-ring pointer-events-none ${className}`}
      fill="none"
    >
      <ellipse cx="200" cy="204" rx="178" ry="172" stroke="currentColor" strokeWidth="3" opacity="0.9" />
      <ellipse cx="196" cy="198" rx="178" ry="172" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <ellipse cx="203" cy="210" rx="118" ry="114" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}
