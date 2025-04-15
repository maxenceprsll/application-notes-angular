import { Component } from '@angular/core';
import { Note } from '../note';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadTags();
    this.loadNotes();
  }

  loadTags() {
    this.tags = this.storageService.getTags();
  }

  loadNotes() {
    this.notes = this.storageService.getNotes();
    this.filteredNotes = this.notes;
  }

  filterNotesByTags() {
    this.filteredNotes = this.notes.filter(note => {
      return this.selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id));
    });
  }

  toggleTagFilter(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.filter((_, i) => i !== index);
    }
    this.filterNotesByTags();
  }

  isTagSelected(tag: Tag): boolean {
    return this.selectedTags.includes(tag);
  }

  addNote() {
    this.storageService.addNote(
      this.notes.length + 1,
      'Nouvelle Note',
      '',
      []
    );
  }
}
