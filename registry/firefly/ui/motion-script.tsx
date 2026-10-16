/**
 * Put <MotionScript /> inside <head> in app/layout.tsx.
 *
 * Enables reveal animations only when JS runs and the user allows motion: adds `motion-ok`
 * to <html>. Failsafe: if the app never hydrates (no <Reveal> mounted), everything is
 * revealed after 3s so content is never stuck hidden.
 */
export const motionScript = `(function(){try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ok');setTimeout(function(){if(!('revealReady' in d.dataset))d.classList.remove('motion-ok')},3000)}}catch(e){}})();`;

export function MotionScript() {
  return <script dangerouslySetInnerHTML={{ __html: motionScript }} />;
}
