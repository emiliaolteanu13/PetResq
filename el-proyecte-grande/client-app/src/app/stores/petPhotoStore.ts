import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { PetPhoto } from "../models/petPhoto";

export default class petPhotoStore{
    petPhotoRegistry = new Map<string, PetPhoto>();
    selectedPetPhoto : PetPhoto | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get petPhotos() {
        return Array.from(this.petPhotoRegistry.values());
    }

    loadPetPhotos = async (postId: string) => {
        this.loadingInitial = true;
        try {
            const petPhotos = await agent.PetPhotos.list(postId);
            
            petPhotos.forEach(petPhoto => {
                this.setPetPhoto(petPhoto);
            })
            this.setLoadingInitial(false);    
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createPetPhoto = async (petPhoto: PetPhoto) => {
        this.loading = true;
        try {
            await agent.PetPhotos.create(petPhoto);
            runInAction(() => {
                this.petPhotoRegistry.set(petPhoto.id, petPhoto);
                this.selectedPetPhoto = petPhoto;
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

    private setPetPhoto = (petPhoto: any) => {
        this.petPhotoRegistry.set(petPhoto.id, petPhoto);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}