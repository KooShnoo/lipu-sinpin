import { fetchingAtom, jotaiStore } from "../state/atoms";
import { User } from "../state/user";
import { wait } from "../utils";

/** fetches a csrf token and puts it in the session storage */
export async function restoreCSRF() {
  const response = await load("/api/session", {csrfHeader: false});
  const csrfToken = response.headers.get("X-CSRF-Token");
  console.assert(!!csrfToken, "[FATAL] backend didn't give a csrf token.");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
  return response;
}

/** uses the session token to get the current user */
export async function getCurrentUser(): Promise<User | null> {
  const res = await restoreCSRF();
  const { user } = await res.json();
  return user;
}

/** 
 * wrapper around {@linkcode fetch}
 * @param opts_.wait whether or not to wait for all loading to stop before fetching
 */
export async function load(input: RequestInfo | URL, opts_: RequestInit & {csrfHeader?: boolean, jsonHeader?: boolean, wait_?: boolean} = {} ) {
  const { csrfHeader = true, jsonHeader = true, wait_ = false, ...opts } = opts_;
  opts.headers = new Headers(opts.headers);
  if (csrfHeader) {
    const csrfToken = sessionStorage.getItem('X-CSRF-Token');
    console.assert(!!csrfToken, "[FATAL] didn't find local csrf token.");
    opts.headers.set('X-CSRF-Token', csrfToken!);
  } 
  if (jsonHeader) opts.headers.set('Content-Type', 'application/json');
  if (wait_ && jotaiStore.get(fetchingAtom)) await wait(() => !jotaiStore.get(fetchingAtom));
  jotaiStore.set(fetchingAtom, true);
  const res = await fetch(input, opts);
  jotaiStore.set(fetchingAtom, false);
  return res;
}