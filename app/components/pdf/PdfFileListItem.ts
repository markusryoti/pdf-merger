/* eslint-disable @typescript-eslint/lines-between-class-members */
export interface IPdfFileListItem {
  absolutePath: string;
  fileName: string;
}

export class PdfFileListItemImpl implements IPdfFileListItem {
  absolutePath: string;
  fileName: string;

  constructor(absolutePath: string, fileName: string) {
    this.absolutePath = absolutePath;
    this.fileName = fileName;
  }
}
