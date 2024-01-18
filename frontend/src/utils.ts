export const inputOnChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => setter(e.target.value);
export const demoUser = {email: "demo@user.com", password: "password"};
export const demoPFP_URL = "https://avatars.githubusercontent.com/u/80598539?v=4";