import CoolRandomShape from '@/components/CoolRandomShape';

export default async function ShapePage({
  params,
}: {
  params: { shape_id: number };
}) {
  const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST!;

  const req = await fetch(`https://${PARTYKIT_HOST}/party/main`, {
    method: 'GET',
  });

  const shapes = await req.json();
  const shape = shapes[params.shape_id - 1];

  return (
    <>
      <div>HAIIIIIIIIIIIIIIIIII</div>
      <div>{params.shape_id}</div>
      <div className="relative size-32 hover:bg-neutral">
        <div className="absolute -z-20 text-primary bg-neutral-950 -m-2 p-1 leading-none">
          {shape.id}
        </div>
        <CoolRandomShape shape={shape} />
      </div>
    </>
  );
}
