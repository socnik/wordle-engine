export type Position = {
  x: number
  y: number
}

export function position(pos: Position): Position
export function position(x: number, y: number): Position
export function position(...args: [Position] | [number, number]): Position {
  if (args.length === 1) return { x: args[0].x, y: args[0].y }

  return { x: args[0], y: args[1] }
}
