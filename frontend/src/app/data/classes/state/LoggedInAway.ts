import { UserState } from './UserState';
import { UserStateInterface } from './UserStateInterface';


export class LoggedInAway implements UserStateInterface {
    userState: UserState;
    private _stateTitle: String;

    constructor(userState) {
        this.userState = userState;
        this._stateTitle = 'Away';
    }

    canReceiveMessages(): boolean {
        console.log('Your status is: Away. You can receive messages.');
        return true;
    }

    canSendMessages(): boolean {
        console.log('Your status is: Away. You can not send messages.');
        return false;
    }

    changeStatus(): void {
        console.log('Status changed from  "logged in away" to "logged in busy"');
        this.userState.setUserState(this.userState.loggedInBusy)
    }

    get stateTitle(): String {
        return this._stateTitle;
    }
}
