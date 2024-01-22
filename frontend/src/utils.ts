type ElementWithValue = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export const inputOnChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<ElementWithValue>) => setter(e.target.value);
export const demoUser = {email: "demo@user.com", password: "password"};
export const demoPFP_URL = "https://avatars.githubusercontent.com/u/80598539?v=4";

/** waits for a condition to return true. */
export async function wait(condition: () => boolean) {
  return new Promise<void>(resolve => {
    const timerId = setInterval(poll, 1000);
  
    function poll() {
      if (condition()) {
        clearInterval(timerId);
        resolve();
      }
    }
  });
}