import { Suspense } from 'react';
import { type Metadata } from 'next';
import { z } from 'zod';
import H1 from '@/components/h1';
import EventsList from '@/components/events-list';
import Loading from '@/app/events/[city]/loading';
import { capitalize } from '@/lib/utils';

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const { city } = params;

  return {
    title: city === 'all' ? 'All events' : `Events in ${capitalize(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

async function EventsPage({ params, searchParams }: EventsPageProps) {
  const { city } = params;
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);

  if (!parsedPage.success) {
    throw new Error('Invalid page number');
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === 'all' && 'All events'}
        {city !== 'all' && `Events in ${capitalize(city)}`}
      </H1>

      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}

export default EventsPage;
