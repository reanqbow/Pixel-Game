


class PixelManager {

    constructor(_displaySize) {
        let _stateManager;
        this.pixelSize = _displaySize;

        for (let i = 0; i < this.displaySize; i++){
            _stateManager[i] = [0, 0, 0];
        }
        this.pixelStateManager = _stateManager;
    }

    changePixelState(pixelOn, horizontalSlot, verticalSlot){
        this.pixelStateManager[horizontalSlot][verticalSlot] = pixelOn;
    }
}
