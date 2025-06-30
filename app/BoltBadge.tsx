/* eslint-disable @next/next/no-img-element */
/** biome-ignore-all lint/performance/noImgElement: L */

"use client";
import "./BoltBadge.css";
export default function BoltBadge() {
  return (
    <div className="fixed top-20 right-4 z-50">
      <a
        href="https://bolt.new/?rid=os72mi"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-300 hover:shadow-2xl"
      >
        <img
          src="https://storage.bolt.army/white_circle_360x360.png"
          alt="Built with Bolt.new badge"
          className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg bolt-badge bolt-badge-intro"
          onAnimationEnd={(event) => {
            // @ts-expect-error GO AWAY
            event.target.classList.add("animated");
          }}
        />
      </a>
    </div>
  );
}
