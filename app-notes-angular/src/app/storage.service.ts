import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //tags: Tag[] = [];
  tags: Tag[] = [
    {id: 0, name: 'Rouge', color: '#d69e9e'},
    {id: 1, name: 'Vert', color: '#a8faa8'},
    {id: 2, name: 'Bleu', color: '#bbbbf8'}
  ];
  //notes: Note[] = [];
  notes: Note[] = [
    {id: 0, title: 'Note Rouge', content: 'Je suis rouge...', createdAt: new Date(), updatedAt: new Date(), tags: [this.tags[0]]},
    {id: 1, title: 'Note Verte', content: 'Je suis verte...', createdAt: new Date(), updatedAt: new Date(), tags: [this.tags[1]]},
    {id: 2, title: 'Note Bleue', content: 'Je suis bleue...', createdAt: new Date(), updatedAt: new Date(), tags: [this.tags[2]]},
    {id: 3, title: 'Note Rouge et Verte', content: 'Je suis rouge et verte...', createdAt: new Date(), updatedAt: new Date(), tags: [this.tags[0], this.tags[1]]},
    {id: 4, title: 'Note Rouge et Bleue', content: 'Je suis rouge et bleue...', createdAt: new Date(), updatedAt: new Date(), tags: [this.tags[0], this.tags[2]]},
    {id: 5, title: 'Note Verte et Bleue', content: 'Je suis verte et bleue...', createdAt: new Date(), updatedAt: new Date(), tags: [this.tags[1], this.tags[2]]},
  ];

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

  getNote(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  updateNote(note: Note): void {
    note.updatedAt = new Date();

    const index = this.notes.findIndex(n => n.id === note.id);
    if (index !== -1) {
      this.notes[index] = note;
    }
  }
}
