import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { v4 as uuid } from 'uuid';

export default class PostStore {
    posts: Post[] = [];
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    loadPosts = async () => {
        this.setLoadingInitial(true); // syncronous code
        //async code
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                post.date = post.date.split('T')[0]; // split date and take first part
                this.posts.push(post);
            })
            this.setLoadingInitial(false);    
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectPost = (id : string) => {
        this.selectedPost = this.posts.find(a => a.id === id)
    }

    cancelSelectedPost = () => {
        this.selectedPost = undefined;
    }

    openForm = (id? : string) => {
        id ? this.selectPost(id) : this.cancelSelectedPost();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createPost = async (post: Post) => {
        this.loading = true;
        post.id = uuid();
        try {
            await agent.Posts.create(post);
            runInAction(() => {
                this.posts.push(post);
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePost = async (post: Post) => {
        this.loading = true;
        try {
            await agent.Posts.update(post);
            runInAction(() => {
                this.posts = [...this.posts.filter(a => a.id !== post.id), post];
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            })
            
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePost = async  (id: string) => {
        this.loading = true;
        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.posts = [...this.posts.filter(a => a.id !== id)];
                if(this.selectedPost?.id === id) this.cancelSelectedPost();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}