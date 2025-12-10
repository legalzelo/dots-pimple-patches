'use client';

import Image from 'next/image';

type TestimonialVideo = {
  src: string;
  poster?: string;
  title?: string;
};

type VideosTestimonialsProps = {
  videos?: TestimonialVideo[];
};

export default function VideosTestimonials({ videos = [] }: VideosTestimonialsProps) {
  // Si todavía no tienes videos, mostramos un placeholder y ya
  if (!videos.length) {
    return (
      <div className="rounded-2xl border bg-white/80 p-4 text-sm text-neutral-700">
        Próximamente videos reales de personas usando Dots ✨
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {videos.map((video) => (
        <article
          key={video.src}
          className="rounded-2xl border bg-white/80 p-3 shadow-sm"
          style={{ borderColor: 'rgba(12,12,12,0.08)' }}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-neutral-100">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
          {video.title && (
            <p className="mt-2 text-xs text-neutral-700">{video.title}</p>
          )}
        </article>
      ))}
    </div>
  );
}
