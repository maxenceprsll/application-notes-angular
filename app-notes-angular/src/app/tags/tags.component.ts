import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { TagComponent } from "../tag/tag.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags',
  imports: [TagComponent, FormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {

  loaded: boolean = false;
  tags: Tag[] = [];
  editing: Tag | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    if (this.loaded) {
      return;
    }
    this.tags = this.storageService.getTags()
    this.loaded = true;
  }

  activateEdit(tag: Tag = {id: -1, name: "nom", color: "#000"}) {
    this.editing = {id: tag.id, name: tag.name, color: tag.color};
    return false;
  }

  stopEdit() {
    this.editing = null;
    return false;
  }

  deleteTag(tag: Tag) {
    this.storageService.deleteTag(tag);
    this.loaded = false;
    this.tags = this.storageService.getTags();
  }

  addTag() {
    if (this.editing) {
      this.storageService.addTag(this.editing.id, this.editing.name, this.editing.color);
      this.loaded = false;
      this.tags = this.storageService.getTags();
      this.editing = null;
    }
  }

  dialogAddTag() {
    const tagName = window.prompt("Entrez le nom du tag:");
    const tagId = this.storageService.getTags().length;
    const tagColor = window.prompt("Entrez la couleur du tag:");
    if (tagName) {
      this.storageService.addTag(tagId, tagName, tagColor!);
      this.loaded = false;
      this.tags = this.storageService.getTags();
    }
    return false;
  }

}