/**
 * Two-tone headline text: the first part in the primary colour, the second half in the
 * muted grey (house rule for every h1/h2). Renders inside the heading element you own:
 *
 *   <h2 className="..."><TwoTone text="Three weeks of diligence." muted="Or twelve minutes." /></h2>
 *
 * `stack` puts the muted part on its own line (display headlines).
 */
export function TwoTone({
  text,
  muted,
  stack = false,
  onDark = false,
}: {
  text: string;
  muted?: string;
  stack?: boolean;
  onDark?: boolean;
}) {
  if (!muted) return <>{text}</>;
  const mutedClass = onDark ? "text-text-on-dark/60" : "text-text-muted";
  return (
    <>
      <span className={stack ? "block" : undefined}>{text}</span>
      {stack ? null : " "}
      <span className={`${mutedClass} ${stack ? "block" : ""}`}>{muted}</span>
    </>
  );
}
