import { Injectable } from '@angular/core';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  tags: Tag[] = [];

  constructor() { }

  getTags(): Tag[] {
    return this.tags;
  }

  addTag(id: number, name: string, color: string): void {
    if (this.tags.some(tag => tag.id === id)) {
      this.editTag(id, name, color);
      return;
    }
    this.tags.push({
      id: id,
      name: name,
      color: color
    });
  }

  editTag(id: number, name: string, color: string): void {
    const tag = this.tags.find(tag => tag.id === id);
    if (tag) {
      tag.name = name;
      tag.color = color;
    }
  }

  deleteTag(tag: Tag): void {
    this.tags = this.tags.filter(t => t.id !== tag.id);
  }
}
