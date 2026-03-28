'use client';

import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  country: string;
  avatar?: string;
  quote: string;
  video: string;
  poster?: string;
  badgeLabel: string;
  badgeBg: string;
}

export default function TestimonialCard({
  name,
  country,
  avatar,
  quote,
  video,
  poster,
  badgeLabel,
  badgeBg,
}: TestimonialCardProps) {
  return (
    <article
      className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm"
      style={{ borderColor: 'rgba(12,12,12,0.08)' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-full ring-1 ring-black/5 shrink-0">
            <Image
              src={avatar || '/testimonials/avatar-fallback.png'}
              alt={name}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-xs text-neutral-500">{country}</div>
          </div>
        </div>
        <div className="text-xs text-neutral-500 shrink-0">〃 Testimonio</div>
      </div>

      <p className="mt-3 text-sm text-neutral-800">{quote}</p>

      <div
        className="mt-3 md:mt-4 relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-neutral-50"
        style={{ boxShadow: '0 0 0 1px rgba(12,12,12,0.06) inset' }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          playsInline
          poster={poster || '/testimonials/poster.jpg'}
        >
          <source src={video} type="video/mp4" />
        </video>
        <span className={`absolute left-2 bottom-2 rounded-full ${badgeBg} text-white text-xs px-2 py-0.5`}>
          {badgeLabel}
        </span>
      </div>
    </article>
  );
}
