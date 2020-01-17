import * as moment from 'moment';
import { IDocument } from '../interfaces/document';
import { SafeResourceUrl } from '@angular/platform-browser';
import { User } from './User';

export class Message implements IDocument<Message> {
    private _id: string;
    private _sender: User;
    private _receiver: User;
    private _title: string;
    private _content: string;
    private _timeSend: moment.Moment;
    private _timeRead: moment.Moment;
    private _filename: string;
    private _filedata: SafeResourceUrl;

    /** Needed for proper functioning of treeview */
    public icon: string;
    public iconOpen: string;
    public type: string;
    public name: string;
    public class: string;

    /** constructor */
    constructor(id: string = '', sender: User = new User(), receiver: User = new User(), title: string = '',
        content: string = '', timeSend: moment.Moment = moment().locale('nl-be'), timeRead: moment.Moment = moment().locale('nl-be'),
        filename: string = '', filedata: SafeResourceUrl = null) {
        this._id = id;
        this._sender = sender;
        this._receiver = receiver;
        this._title = title;
        this._content = content;
        this._timeSend = timeSend;
        this._timeRead = timeRead;
        this._filename = filename;
        this._filedata = filedata;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get sender(): User {
        return this._sender;
    }

    set sender(value: User) {
        this._sender = value;
    }

    get receiver(): User {
        return this._receiver;
    }

    set receiver(value: User) {
        this._receiver = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get timeSend(): moment.Moment {
        return this._timeSend;
    }

    set timeSend(value: moment.Moment) {
        this._timeSend = value;
    }

    get timeRead(): moment.Moment {
        return this._timeRead;
    }

    set timeRead(value: moment.Moment) {
        this._timeRead = value;
    }

    get filename(): string {
        return this._filename;
    }

    set filename(value: string) {
        this._filename = value;
    }

    get filedata(): SafeResourceUrl {
        return this._filedata;
    }

    set filedata(value: SafeResourceUrl) {
        this._filedata = value;
    }

    /** Override of toString */
    public toString() {
        return this._content;
    }

    fromDocument(messageJson: any): Message {
        const message = new Message();

        if (!messageJson.hasOwnProperty('id')) {
            return message;
        }

        message.id = messageJson['_id'];
        message.sender = new User(messageJson['sender']);
        message.receiver = new User(messageJson['receiver']);
        message.title = messageJson['title'];
        message.content = messageJson['content'];
        message.timeSend = moment(messageJson['timeSend']);
        message.timeRead = moment(messageJson['timeRead']);
        message.filename = messageJson['file'][0];
        if (message.filename === undefined || message.filename === null) {
            message.filename = '';
        }
        message.filedata = messageJson['file'][1];
        if (message.filedata === undefined || message.filedata === null) {
            message.filedata = '';
        }

        return message;
    }

    toDocument(obj: Message): any {
        const messageJson = <any>{};

        if (obj.id !== '') {
            messageJson.id = obj.id;
        }

        messageJson.receiver = obj.receiver['_id'];
        messageJson.title = obj.title;
        messageJson.content = obj.content;
        messageJson.file = [obj.filename, obj.filedata];

        messageJson.timeSend = obj.timeSend;
        messageJson.timeRead = obj.timeRead;

        messageJson['file'][0] = obj.filename;
        if (messageJson['file'][0] === undefined || messageJson['file'][0] === null) {
            messageJson['file'][0] = '';
        }
        messageJson['file'][1] = obj.filedata;
        if (messageJson['file'][1] === undefined || messageJson['file'][1] === null) {
            messageJson['file'][1] = '';
        }

        return messageJson;
    }

    toDocumentSpec(obj: Message): any {
        const messageJson = <any>{};

        if (obj.id !== '') {
            messageJson.id = obj['_id'];
        }

        messageJson.title = obj.title;
        messageJson.content = obj.content;
        messageJson.receiver = new User();
        messageJson.receiver.id = obj.receiver;

        messageJson.sender = new User();
        messageJson.sender.id = obj.sender;

        messageJson.timeSend = obj.timeSend;
        messageJson.timeRead = obj.timeRead;

        messageJson.filename = obj['file'][0];
        if (messageJson.filename === undefined || messageJson.filename === null) {
            messageJson.filename = '';
        }
        messageJson.filedata = obj['file'][1];
        if (messageJson.filedata === undefined || messageJson.filedata === null) {
            messageJson.filedata = '';
        }

        return messageJson;
    }

    hardCopy(obj: Message): Message {
        const message = new Message();

        message.sender = obj.sender;
        message.receiver = obj.receiver;

        // Onderstaande indien een user ook via hard copy gekopieerd moet worden
        // message.sender = message.sender.hardCopy(obj.sender);
        // message.receiver = message.receiver.hardCopy(obj.receiver);

        message.title = obj.title;
        message.content = obj.content;
        message.timeSend = obj.timeSend;
        message.timeRead = obj.timeRead;

        return message;
    }
}
