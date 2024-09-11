export function randomClipPathShape(): string {
  // Generate a random number of vertices (between 3 and 10 for polygon, 11 for square, 12 for circle)
  const numVertices = Math.floor(Math.random() * 10) + 3;

  if (numVertices === 11) {
    // Square points
    return `polygon(
      0% 0%,   /* top-left */
      100% 0%, /* top-right */
      100% 100%, /* bottom-right */
      0% 100% /* bottom-left */
    )`;
  } else if (numVertices === 12) {
    // Circle clip-path with 50% radius, centered in the div
    return `circle(50% at 50% 50%)`;
  } else {
    // Random polygon points
    const points = Array.from({ length: numVertices }, () => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
    });
    return `polygon(${points.join(', ')})`;
  }
}