export function createArrayAndFill<T>(length: number): (null | T)[] {
  return new Array(length).fill(null)
}
