// tslint:disable-next-line:no-empty-interface
export interface UserStateInterface {
    stateTitle: String;

    canReceiveMessages(): boolean;
    canSendMessages(): boolean;
    changeStatus(): void;
}
