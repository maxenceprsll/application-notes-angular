import { Tag } from "./tag";

export class Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];

    constructor(id: number, title: string, content: string, createdAt: Date, updatedAt: Date, tags: Tag[]) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags;
    }
}
