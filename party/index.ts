import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  // Initialize Shapes as an array to hold shapes data
  Shapes: Array<{ id: string; clipPath: string; color: string }> = [];

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Send the current state of Shapes when a user connects
    conn.send(JSON.stringify(this.Shapes));
  }

  onMessage(message: string, sender: Party.Connection) {
    const data = JSON.parse(message);
    
    if (data.type === 'add') {
      // Add the new shape to the Shapes array
      this.Shapes.push(data);
    } else if (data.type === 'subtract') {
      // Remove the last shape from the Shapes array, if it exists
      if (this.Shapes.length > 0) {
        this.Shapes.pop();
      }
    }

    // Broadcast the updated Shapes array to all connected clients
    this.room.broadcast(JSON.stringify(this.Shapes));
  }
}

Server satisfies Party.Worker;
