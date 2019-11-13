// @flow
export const STRUCTURE_TYPES = {
  DEFAULT: 'default',
  ENTITY: 'entity',
}

export type StructureType = $Values<typeof STRUCTURE_TYPES>
