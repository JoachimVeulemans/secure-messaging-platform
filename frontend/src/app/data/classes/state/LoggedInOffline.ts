import { UserState } from './UserState';
import { UserStateInterface } from './UserStateInterface';

export class LoggedInOffline implements UserStateInterface {
    userState: UserState;
    private _stateTitle: String;

    constructor(userState) {
        this.userState = userState;
        this._stateTitle = 'Offline';
    }

    canReceiveMessages(): boolean {
        console.log('Your status is: Offline. You can not send messages.');
        return false;
    }

    canSendMessages(): boolean {
        console.log('Your status is: Offline. You can not receive messages.');
        return false;
    }

    changeStatus(): void {
        console.log('Status changed from  "logged in offline" to "online"');
        this.userState.setUserState(this.userState.loggedInActive)
    }

    get stateTitle(): String {
        return this._stateTitle;
    }


}
