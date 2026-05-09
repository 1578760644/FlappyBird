import { _decorator, Component, Input, input, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    //可不可以通过枚举来传奖牌
    //显示GameOverUI
    public show(curScore: number, bestScore: number) {
        this.node.active = true;
    }

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
    onTouchStart() {
        GameManager.inst().transitionToGameOverState();
    }
}


