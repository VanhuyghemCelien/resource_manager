import Model, { attr } from '@ember-data/model';
import type { ImageMimeTypes } from '../../../resource-backend/src/api/enums/mime-type.enum';

export default class DocumentModel extends Model {
  @attr() declare fileName: string;
  @attr() declare originalName: string;
  @attr() declare path: string;
  @attr() declare mimeType: ImageMimeTypes;
  @attr() declare size: number;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    document: DocumentModel;
  }
}
