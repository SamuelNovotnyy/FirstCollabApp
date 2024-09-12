'use client';

import { Suspense, useEffect, useState } from 'react';
import ThemeController from '@/components/ThemeController';
import { randomClipPathShape } from '@/lib/randomClipPathShape';
import { getRandomColor } from '@/lib/randomHexColor';
import Shape from '@/types/Shape';
import usePartySocket from 'partysocket/react';
import CoolRandomShape from '@/components/CoolRandomShape';
import Link from 'next/link';

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;
//const PARTYKIT_HOST = '127.0.0.1:1999';

export default function Home() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Fetch initial shapes on mount
  useEffect(() => {
    async function fetchShapes() {
      const req = await fetch(`https://${PARTYKIT_HOST}/party/main`, {
        method: 'GET',
      });

      if (req.ok) {
        const initialShapes: Shape[] = await req.json();
        console.log("GET: ", initialShapes);
        setShapes(initialShapes === null ? [] : initialShapes);
      }
    }

    fetchShapes();
  }, []);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: 'main',
    onMessage(event) {
      const message = JSON.parse(event.data) as Shape[];
      if (message) setShapes(message);
    },
  });

  async function handleAdd() {
    const newShapeData = newShape();
    socket.send(JSON.stringify({ type: 'add', data: newShapeData }));
  }

  async function handleSubtract() {
    socket.send(JSON.stringify({ type: 'pop' }));
  }

  function newShape(): Shape {
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
        <div className="flex justify-center flex-row flex-wrap gap-3 m-5">
          {shapes.map((shape, i) => (
            <Link key={i} href={`/${i}`}>
              <div className="relative size-32 hover:bg-neutral">
                <div className="absolute -z-20 text-primary bg-neutral-950 -m-2 p-1 leading-none">
                  {shape.id}
                </div>
                <CoolRandomShape shape={shape} />
              </div>
            </Link>
          ))}
        </div>
      </Suspense>
    </>
  );
}
