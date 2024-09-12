'use client';

import { useState } from 'react';
import CoolRandomShape from '@/components/CoolRandomShape';
import Link from 'next/link';
import Shape from '@/types/Shape';
import usePartySocket from 'partysocket/react';

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;

export default function ShapeUI({
  initialShapes = [],
}: {
  initialShapes?: Shape[];
}) {
  const [shapes, setShapes] = useState(initialShapes);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: 'main',
    onMessage(event) {
      const message = JSON.parse(event.data) as Shape[];
      if (message)
         setShapes(message);
    },
  });

  return (
    <div className="flex justify-center flex-row flex-wrap gap-3 m-5">
      {shapes.map((shape, i) => (
        <Link key={i} href={`/${i}`}>
          <div className="relative size-32 hover:bg-neutral">
            <div className="absolute -z-20 text-primary bg-neutral-950 -m-2 p-1 leading-none">
              {i}
            </div>
            <CoolRandomShape shape={shape} />
          </div>
        </Link>
      ))}
    </div>
  );
}
