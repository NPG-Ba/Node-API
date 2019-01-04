export class ListTableState {
    public items: any[] = [];
    public isProcessing: boolean; // Should be convert to local variable
    constructor() {
        this.isProcessing = false;
    }
}
