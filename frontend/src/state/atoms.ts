import { atom } from 'jotai';

export const postFormType = {
  CREATE: 0,
  EDIT: 1,
} as const;

export type PostFormType = typeof postFormType[keyof typeof postFormType]
export type PostModalStatus = null | PostFormType

export const postModalAtom = atom<PostModalStatus>(null);