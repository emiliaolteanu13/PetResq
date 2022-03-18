import { makeAutoObservable, runInAction } from "mobx";
import { Comment } from "../models/comment";
import agent from "../api/agent";

export default class CommentStore{
    commentRegistry = new Map<string, Comment>();
    selectedComment: Comment | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadComments = async () => {
        this.loadingInitial = true;
        //async code
        try {
            const comments = await agent.Comments.list();
            comments.forEach(comment => {
                this.setComment(comment);
            })
            this.setLoadingInitial(false);    
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    private setComment = (comment: Comment) => {
        // comment.date = new Date(comment.date!);
        this.commentRegistry.set(comment.id, comment);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createComment = async (comment: Comment) => {
        this.loading = true;
        try {
            await agent.Comments.create(comment);
            runInAction(() => {
                this.commentRegistry.set(comment.id, comment);
                this.selectedComment = comment;
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
    deleteComment = async  (id: string) => {
        this.loading = true;
        try {
            await agent.Comments.delete(id);
            runInAction(() => {
                this.commentRegistry.delete(id);
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