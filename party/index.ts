import Shape from "@/types/Shape";
import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  // Initialize Shapes as an array to hold shapes data
  Shapes: Shape[] = [];

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Send the current state of Shapes when a user connects
    conn.send(JSON.stringify(this.Shapes));
  }

  async onRequest(req: Party.Request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // or specify your domain
      'Access-Control-Allow-Methods': 'GET, POST, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (req.method === 'OPTIONS') {
      // Preflight request for CORS
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    if (req.method === "POST") {
      const newShape = (await req.json()) as Shape;
      this.Shapes?.push(newShape);
    }

    if (req.method === "DELETE") {
      this.Shapes?.pop();
    }

    if (this.Shapes) {
      return new Response(JSON.stringify(this.Shapes), {
        headers: corsHeaders,
      });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }

  async onMessage(message: string) {
    if (!this.Shapes) return

    const event = JSON.parse(message);

    if (event.type === "add") {
      this.Shapes!.push(event.data)
    } else if (event.type === "pop") {
      this.Shapes.pop() 
    }

    this.room.broadcast(JSON.stringify(this.Shapes))
  }
}

Server satisfies Party.Worker;