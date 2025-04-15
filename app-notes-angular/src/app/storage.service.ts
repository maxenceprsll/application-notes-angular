import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  tags: Tag[] = [];
  notes: Note[] = [];

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

  getNotes(): Note[] {
    return this.notes;
  }

  addNote(id: number, title: string, content: string, tags: Tag[]): void {
    if (this.notes.some(note => note.id === id)) {
      this.editNote(id, title, content, tags);
      return;
    }
    this.notes.push({
      id: id,
      title: title,
      content: content,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    });
  }

  editNote(id: number, title: string, content: string, tags: Tag[]): void {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.title = title;
      note.content = content;
      note.updatedAt = new Date();
      note.tags = tags;
    }
  }

  deleteNote(note: Note): void {
    this.notes = this.notes.filter(n => n.id !== note.id);
  }
}
