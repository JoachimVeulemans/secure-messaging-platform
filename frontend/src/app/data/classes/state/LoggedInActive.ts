import { UserState } from './UserState';
import { UserStateInterface } from './UserStateInterface';


export class LoggedInActive implements UserStateInterface {
    userState: UserState;
    private _stateTitle: String;

    constructor(userState) {
        this.userState = userState;
        this._stateTitle = 'Active';
    }

    canReceiveMessages(): boolean {
        console.log('Your status is: Active. You can receive messages.');
        return true;
    }

    canSendMessages(): boolean {
        console.log('Your status is: Active. You can send messages.');
        return true;
    }

    changeStatus(): void {
        console.log('Status changed from  "logged in active" to "logged in away"');
        this.userState.setUserState(this.userState.loggedInAway)
    }

    get stateTitle(): String {
        return this._stateTitle;
    }
}
