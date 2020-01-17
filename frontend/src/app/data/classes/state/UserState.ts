import { LoggedInActive } from './LoggedInActive';
import { LoggedInAway } from './LoggedInAway';
import { LoggedInBusy } from './LoggedInBusy';
import { LoggedInOffline } from './LoggedInOffline';
import { UserStateInterface } from './UserStateInterface';

export class UserState {
    private _loggedInActive: UserStateInterface;
    private _loggedInAway: UserStateInterface;
    private _loggedInBusy: UserStateInterface;
    private _loggedInOffline: UserStateInterface;
    private _loggedOut: UserStateInterface;
    private _userStateInterface: UserStateInterface;
    private _stateTitle: String;


    constructor() {
        this._loggedInActive = new LoggedInActive(this);
        this._loggedInAway = new LoggedInAway(this);
        this._loggedInBusy = new LoggedInBusy(this);
        this._loggedInOffline = new LoggedInOffline(this);

        this._userStateInterface = this._loggedInActive;
    }

    setUserState(userStateInterface: UserStateInterface) {
        this._userStateInterface = userStateInterface;
    }

    canReceiveMessages(): boolean {
        return this._userStateInterface.canReceiveMessages();
    }

    canSendMessages(): boolean {
        return this._userStateInterface.canSendMessages();
    }

    changeStatus(): void {
        this._userStateInterface.changeStatus();
        this._stateTitle = this.userStateInterface.stateTitle;
    }

    set stateTitle(value: String) {
        this._stateTitle = value;
    }

    get stateTitle(): String {
        return this._stateTitle;
    }

    get loggedInActive(): UserStateInterface {
        return this._loggedInActive;
    }

    get loggedInAway(): UserStateInterface {
        return this._loggedInAway;
    }

    get loggedInBusy(): UserStateInterface {
        return this._loggedInBusy;
    }

    get loggedInOffline(): UserStateInterface {
        return this._loggedInOffline;
    }

    get loggedOut(): UserStateInterface {
        return this._loggedOut;
    }

    get userStateInterface(): UserStateInterface {
        return this._userStateInterface;
    }
}
