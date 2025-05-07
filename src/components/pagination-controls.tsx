import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

const LINK_STYLES = 'text-white flex items-center gap-x-2 px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-sm';

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  return (
    <section className="w-full flex justify-between">
      {previousPath ? (
        <Link href={previousPath} className={LINK_STYLES}>
          <ArrowLeftIcon />
          Previous
        </Link>
      ) : <div />}

      {nextPath && (
        <Link href={nextPath} className={LINK_STYLES}>
          Next
          <ArrowRightIcon />
        </Link>
      )}
    </section>
  );
}

import React from 'react';

export default PaginationControls;
