import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Post } from "../models/post";
import { toast } from "react-toastify";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { history } from "../..";
import { Comment } from "../models/comment";
import { request } from "http";


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:44343/api';
const ImageFolder = 'https://localhost:44343/images';
const ProfileImageFolder = 'https://localhost:44343/profiles';
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config} = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            if (status === 401 ) {
                store.userStore.logout();
                toast.error('Session expired - please login again');
            }
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;


const requests = {
    get : <T> (url: string) => axios.get<T>(url).then(responseBody),
    post : <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put : <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del : <T> (url: string) => axios.delete<T>(url).then(responseBody),
}


const APIKey = requests.get<string>('/posts/googleApiKey');

const Posts = {
    list: () => requests.get<Post[]>('/posts'),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (post: Post) => axios.post<void>('/posts', post),
    update: (post: Post) => axios.put<void>(`/posts/${post.id}`, post),
    delete: (id: string) => axios.delete<void>(`/posts/${id}`),
    postsByStatus: (status: string) => requests.get<Post[]>(`posts/status/${status}`),
    postsByPet: (pet: string) => requests.get<Post[]>(`/posts/pet/${pet}`)

}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Comments = {
    list: () => requests.get<Comment[]>('/comments'),
    create: (comment: Comment) => axios.post<void>(`/comments`, comment),
    update: (comment: Comment) => axios.put<void>(`/comments/${comment.id}`, comment),
    delete : (id: string) => axios.delete<void>(`/comments/${id}`)
}

const PetPhotos = {
    list: () => requests.get<any[]>(`/petPhotos`),
    create: (petPhoto : any) => axios.post<void>(`/petPhotos`, petPhoto)
}
const ProfilePhotos = {
    profilePhoto : (username: string) => requests.get<any>(`/profilePhotos/${username}`),
    create : (profilePhoto: any) => axios.post<void>(`/profilePosts`, profilePhoto)
}

const agent = {
    Posts,
    Account,
    Comments,
    PetPhotos,
    ProfilePhotos,
    ImageFolder,
    ProfileImageFolder,
    APIKey
}

export default agent;