import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  count: number = 0;

  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Send the current count to the new connection
    conn.send(JSON.stringify(this.count));
    console.log(`New connection. Current square count: ${this.count}`);
  }

  onMessage(message: string, sender: Party.Connection) {
    const data = JSON.parse(message);
    
    if (data.type === 'add') {
      this.count++;
    } else if (data.type === 'subtract') {
      this.count = Math.max(0, this.count - 1);
    }

    console.log(`Action: ${data.type}, New square count: ${this.count}`);

    // Broadcast the new count to all connections
    this.room.broadcast(JSON.stringify(this.count));
  }
}

Server satisfies Party.Worker;