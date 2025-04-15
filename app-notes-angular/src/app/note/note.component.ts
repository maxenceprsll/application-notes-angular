import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../note';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { Tag } from '../tag';

@Component({
  selector: 'app-note',
  imports: [FormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  note: Note | undefined = undefined;
  tags: Tag[] = [];

  constructor(private storageService: StorageService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.note = this.storageService.getNote(id? Number(id) : -1);
    this.tags = this.storageService.getTags();
  }

  toggleTag(tag: Tag) {
    if (this.note) {
      const index = this.note.tags.indexOf(tag);
      if (index === -1) {
        this.note.tags.push(tag);
      } else {
        this.note.tags.splice(index, 1);
      }
    }
  }

  isTagSelected(tag: Tag): boolean {
    return this.note ? this.note.tags.includes(tag) : false;
  }
}
