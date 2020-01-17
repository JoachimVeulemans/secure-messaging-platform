// tslint:disable-next-line:no-empty-interface
export interface IDocumentBase { }

export interface IDocument<T> extends IDocumentBase {
    id: string;

    fromDocument(userJson: any): T;
    toDocument(obj: T): any;
}
