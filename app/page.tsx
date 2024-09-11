'use client';

import { Suspense, useState } from 'react';
import usePartySocket from 'partysocket/react';
import ThemeController from '@/components/ThemeController';
import CoolRandomShape from '@/components/CoolRandomShape';
import { randomClipPathShape } from '@/lib/randomClipPathShape';
import { getRandomColor } from '@/lib/randomHexColor';

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;

export default function Home() {
  const [shapes, setShapes] = useState<
    Array<{ id: string; clipPath: string; color: string }>
  >([]);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: 'main',
    onMessage(event) {
      const message = JSON.parse(event.data);
      if (Array.isArray(message)) {
        setShapes(message);
      }
    },
  });

  function handleAdd() {
    const newShapeData = newShape();
    socket.send(JSON.stringify({ type: 'add', ...newShapeData }));
  }

  function handleSubtract() {
    socket.send(JSON.stringify({ type: 'subtract' }));
  }

  function newShape(): { id: string; clipPath: string; color: string } {
    return {
      id: (shapes.length + 1).toString(),
      clipPath: randomClipPathShape(),
      color: getRandomColor(),
    };
  }

  return (
    <>
      <div className="h-24 w-full flex justify-center items-center bg-accent">
        <div className="container flex justify-between items-center">
          <h1 className="font-extrabold text-base-100">Welcome!!!</h1>
          <button className="btn btn-neutral" onClick={handleAdd}>
            Add a shape
          </button>
          <button className="btn btn-neutral" onClick={handleSubtract}>
            Remove a shape
          </button>
          <ThemeController />
        </div>
      </div>
      <Suspense fallback={<div className="skeleton w-full h-96"></div>}>
        <div className="flex flex-row flex-wrap gap-3 m-5">
          {shapes.map(shape => (
            <div
              key={shape.id}
              className="relative size-20"
            >
              <div className='absolute -z-20 text-primary bg-neutral-950 -m-2 p-1 leading-none'>{shape.id}</div>
              <CoolRandomShape shape={shape} />
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
}
