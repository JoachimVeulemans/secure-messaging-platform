import { UserState } from './UserState';
import { UserStateInterface } from './UserStateInterface';

export class LoggedInBusy implements UserStateInterface {
    userState: UserState;
    private _stateTitle: String;

    constructor(userState) {
        this.userState = userState;
        this._stateTitle = 'Busy';
    }

    canReceiveMessages(): boolean {
        console.log('Your status is: Busy. You can send messages.');
        return true;
    }

    canSendMessages(): boolean {
        console.log('Your status is: Busy. You can not receive messages.');
        return false;
    }

    changeStatus(): void {
        console.log('Status changed from  "logged in busy" to "offline"');
        this.userState.setUserState(this.userState.loggedInOffline)
    }

    get stateTitle(): String {
        return this._stateTitle;
    }
}
