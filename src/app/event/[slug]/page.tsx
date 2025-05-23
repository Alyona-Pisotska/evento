import React from 'react';
import { type Metadata } from 'next';
import Image from 'next/image';
import H1 from '@/components/h1';
import { getEvent } from '@/lib/server-utils';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const event = await getEvent(slug);

  return {
    title: event.name,
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'comedy-extravaganza' },
    { slug: 'dj-practice-session' },
  ];
}

async function EventPage({ params }: Props) {
  const { slug } = params;
  const event = await getEvent(slug);

  const { name, imageUrl, organizerName, date, description, location } = event;
  const eventDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={imageUrl}
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover blur-3xl z-0"
          priority
        />

        <div className="z-1 flex flex-col lg:flex-row gap-6 lg:gap-16 relative">
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">{eventDate}</p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">{name}</H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{organizerName}</span>
            </p>

            <button
              className="bg-white/20 bg-blur text-lg capitalize mt-5 lg:mt-auto rounded-md w-[95vw] sm:w-full py-2 border-white/10 border-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-8">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}

export default EventPage;
