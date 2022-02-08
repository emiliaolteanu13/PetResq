import { useContext, createContext } from "react";
import CommonStore from "./commonStore";
import PostStore from "./postStore";
import UserStore from "./userStore";

interface Store {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    postStore: new PostStore (),
    commonStore : new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}