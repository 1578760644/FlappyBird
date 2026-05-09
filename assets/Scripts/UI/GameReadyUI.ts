import { _decorator, Component, Input, input, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameReadyUI')
export class GameReadyUI extends Component {
    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start() {

    }

    update(deltaTime: number) {

    }


    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    //当发生触摸事件的时候，直接调用GameManager里面的方法
    onTouchStart() {
        GameManager.inst().transitionToGamingState();
    }
}


