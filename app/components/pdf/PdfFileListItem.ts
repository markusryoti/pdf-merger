/* eslint-disable @typescript-eslint/lines-between-class-members */
export interface IPdfFileListItem {
  id: number;
  absolutePath: string;
  fileName: string;
}

export class PdfFileListItemImpl implements IPdfFileListItem {
  id: number;
  absolutePath: string;
  fileName: string;

  constructor(id: number, absolutePath: string, fileName: string) {
    this.id = id;
    this.absolutePath = absolutePath;
    this.fileName = fileName;
  }
}
