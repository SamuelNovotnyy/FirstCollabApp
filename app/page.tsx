'use client';

import { Suspense, useState } from 'react';
import usePartySocket from 'partysocket/react';

const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;

export default function Home() {
  const [squares, setSquares] = useState(0);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: 'mainx',
    onMessage(event) {
      const message = JSON.parse(event.data);
      if (typeof message === 'number') {
        setSquares(message);
      }
    },
  });

  function handleAdd() {
    socket.send(JSON.stringify({ type: 'add' }));
  }

  function handleSubtract() {
    socket.send(JSON.stringify({ type: 'subtract' }));
  }

  return (
    <>
      <div className="h-24 w-full bg-black flex justify-between items-center px-16 py-4">
        <h1 className="font-extrabold text-white">Shared Room</h1>
        <button className="btn btn-neutral" onClick={handleAdd}>
          Add a cube
        </button>
        <button className="btn btn-neutral" onClick={handleSubtract}>
          Remove a cube
        </button>
      </div>
      <Suspense fallback={
        <div className='skeleton w-full h-96'></div>
      }>
        <div className="flex flex-row flex-wrap gap-3 m-5 bg-transparent">
          {Array.from({ length: squares }).map((_, index) => (
            <div key={index} className="flex justify-center items-center w-7 h-7 bg-red-500 text-red-700">{index + 1}</div>
          ))}
        </div>
      </Suspense>
    </>
  );
}
