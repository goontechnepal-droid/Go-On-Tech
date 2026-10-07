/**
 * Light-theme backdrop for hero areas: a faint slate dot grid that fades out toward
 * the bottom (styles: `.dots` in global.css). The parent must be positioned and clip.
 */
export default function Backdrop() {
  return <div className="dots" aria-hidden="true" />;
}
