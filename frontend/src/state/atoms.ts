import { atom, createStore } from 'jotai';
import { Post } from './post';

export const jotaiStore = createStore();

export const fetchingAtom = atom<boolean>(false);

// normal developers watching javascript developers try to create a tagged union:
// [!["Look What They Need to Mimic a Fraction of Our Power" meme](https://knowyourmeme.com/memes/look-what-they-need-to-mimic-a-fraction-of-our-power)](https://i.kym-cdn.com/entries/icons/original/000/037/360/coverpower.jpg)

// <"ENUM"> ------------------------------------------------------------------------------------------------------------
export interface CREATE {kind: "CREATE"}
export const postFormCREATE: () =>  CREATE = () => ({kind: "CREATE"});
export interface EDIT {
  kind: "EDIT";
  post: Post;
}
export const postFormEDIT: (post: Post) =>  EDIT = post => ({kind: "EDIT", post});

export interface NONE {kind: "NONE"}
export const postFormNONE: () =>  NONE = () => ({kind: "NONE"});
// </"ENUM"> -----------------------------------------------------------------------------------------------------------

export type PostFormData = CREATE | EDIT | NONE
export const postModalAtom = atom<PostFormData>(postFormNONE());

/**
 * when an unauthenticated user visits a page requiring auth, they are redirected to the homepage.
 * 
 * this tracks what page the user was trying to visit, so we can bring them back there after they sign in/up.
 */
export const redirectAtom = atom<string | null>(null);
