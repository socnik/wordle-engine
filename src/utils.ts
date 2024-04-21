export function createArrayAndFill<T>(length: number): (null | T)[] {
  return new Array(length).fill(null)
}

export function splitStringOnGroups(
  inputString: string,
  groupLength: number
): string[] {
  const groupsNumber = inputString.length / groupLength

  if (!Number.isInteger(groupsNumber)) {
    throw new Error('The string is not divided into equal lengths')
  }

  const groups: string[] = []

  for (let i = 0; i < groupsNumber; i++) {
    const startIndex = groupLength * i
    const endIndex = startIndex + groupLength
    const group = inputString.slice(startIndex, endIndex)

    groups.push(group)
  }

  return groups
}

type IdentityFunc<T> = (value: T) => T

export function defineIdentity<T>(): IdentityFunc<T> {
  return (value: T) => value
}
