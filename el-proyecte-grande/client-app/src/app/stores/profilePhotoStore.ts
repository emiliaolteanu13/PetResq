import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class ProfilePhotoStore{
    selectedProfilePhoto : any | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadProfilePhoto = async (userEmail: string) => {
        this.loadingInitial = true;
        try {
            const profilePhoto = agent.ProfilePhotos.profilePhoto(userEmail)
            
            this.setProfilePhoto(profilePhoto);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createProfilePhoto = async (profilePhoto: any) => {
        this.loading = true;
        try {
            await agent.ProfilePhotos.create(profilePhoto);
            runInAction(() => {
                this.setProfilePhoto(profilePhoto)
                this.loading = false;
            })
        }
            
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    private setProfilePhoto = (profilePhoto: any) => {
        this.selectedProfilePhoto.set(profilePhoto);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}