import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { NotesComponent } from './notes/notes.component';
import { NoteComponent } from './note/note.component';

export const routes: Routes = [
    {path: '', component: NotesComponent, pathMatch: 'full'},
    {path: 'note/:id', component: NoteComponent},
    {path: 'tags', component: TagsComponent},
];
