'use client'

import CoolRandomShape from '@/components/CoolRandomShape';
import Shape from '@/types/Shape';
import { useEffect, useState } from 'react';

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;

export default function ShapePage({
  params,
}: {
  params: { shape_id: number };
}) {
  const [shape, setShape] = useState<Shape>({
    id: '',
    clipPath: '',
    color: '',
  });


  // Fetch initial shapes on mount
  useEffect(() => {
    async function fetchShapes() {
      const req = await fetch(`https://${PARTYKIT_HOST}/party/main`, {
        method: 'GET',
      });

      if (req.ok) {
        const initialShapes: Shape[] = await req.json();
        console.log('GET on single page: ', initialShapes);
        setShape(initialShapes[params.shape_id]);
      }
    }

    fetchShapes();
  }, []);

  return (
    <>
      <div className="p-24">
        <div className="mb-10">HAIIIIIIIIIIIIIIIIII</div>
        <div className="relative size-32 hover:bg-neutral">
          <div className="absolute -z-20 text-primary bg-neutral-950 -m-2 p-1 leading-none">
            {shape.id}
          </div>
          <CoolRandomShape shape={shape} />
        </div>
      </div>
    </>
  );
}
