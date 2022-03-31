import { useContext, createContext } from "react";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import PetPhotoStore from "./petPhotoStore";
import PostStore from "./postStore";
import ProfilePhotoStore from "./profilePhotoStore";

import UserStore from "./userStore";

interface Store {
    postStore: PostStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    commentStore: CommentStore;
    petPhotoStore: PetPhotoStore;
    profilePhotoStore: ProfilePhotoStore;
}

export const store: Store = {
    postStore: new PostStore (),
    commonStore : new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore(),
    petPhotoStore: new PetPhotoStore(),
    profilePhotoStore: new ProfilePhotoStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}