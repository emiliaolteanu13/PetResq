export interface Post {
    id: string;
    location: string;
    userID: string;
    username: string;
    title: string;
    description: string;
    petType: string;
    statusType: string;
    date: Date | null;
}
