import { Component } from '@angular/core';
import { Note } from '../note';
import { Tag } from '../tag';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

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

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.loadTags();
    this.loadNotes();
  }

  loadTags() {
    this.tags = this.storageService.getTags();
  }

  loadNotes() {
    this.notes = this.storageService.getNotes();
    this.filterNotesByTags();
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
      this.selectedTags.splice(index, 1);
    }
    this.filterNotesByTags();
  }

  isTagSelected(tag: Tag): boolean {
    return this.selectedTags.includes(tag);
  }

  addNote() {
    this.selectedTags = [];
    this.storageService.addNote(
      this.notes.length + 1,
      'Nouvelle Note',
      '',
      []
    );
    this.loadNotes();
  }

  selectNote(note: Note) {
    this.router.navigate(['/note', note.id]);
  }

  getShortContent(content: string): string {
    return content ? content.length > 50 ? content.substring(0, 50) + '...' : content : '';
  }

  getDateFormated(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}
