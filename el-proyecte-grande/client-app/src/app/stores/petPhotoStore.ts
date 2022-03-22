import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class PetPhotoStore{
    petPhotoRegistry = new Map<string, any>();
    selectedPetPhoto : any | undefined = undefined;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get petPhotos() {
        return Array.from(this.petPhotoRegistry.values());
    }

    loadPetPhotos = async () => {
        this.loadingInitial = true;
        try {
            const petPhotos = await agent.PetPhotos.list();
            
            petPhotos.forEach(petPhoto => {
                this.setPetPhoto(petPhoto);
            })
            this.setLoadingInitial(false);    
            console.log(Array.from(this.petPhotoRegistry.values()))
            console.log(this.petPhotoRegistry.size)
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createPetPhoto = async (petPhoto: any) => {
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