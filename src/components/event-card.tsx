'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { type EventoEvent } from '@prisma/client';

type EventCardProps = {
  event: EventoEvent;
};

const MotionLink = motion(Link);

function EventCard({ event }: EventCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.5 1'],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const { name, imageUrl, organizerName, location, date, slug } = event;
  const eventDay = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
  });
  const eventMonth = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
  });

  return (
    <MotionLink
      ref={ref}
      className="flex-1 basis-80 h-[380px] max-w-[500px]"
      href={`/event/${slug}`}
      style={{
        // @ts-ignore
        scale: scaleProgress,
        // @ts-ignore
        opacity: opacityProgress,
      }}
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
    >
      <section className="w-full h-full flex flex-col bg-white/[3%] rounded-xl overflow-hidden relative state-effects">
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={280}
          className="h-[60%] object-cover"
        />

        <div className="flex flex-col flex-1 justify-center items-center">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="italic text-white/75">By {organizerName}</p>
          <p className="text-sm text-white/50 mt-4">{location}</p>
        </div>

        <section
          className="absolute left-[12px] top-[12px] flex flex-col justify-center items-center h-[45px] w-[45px] bg-black/30 rounded-md">
          <p className="text-xl font-bold -mb-[5px]">{eventDay}</p>
          <p className="text-xs uppercase text-accent">{eventMonth}</p>
        </section>
      </section>
    </MotionLink>
  );
}

export default EventCard;
