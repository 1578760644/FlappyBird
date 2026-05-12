import { _decorator, Component, Input, input, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    public curScoreLabel: Label = null;
    @property(Label)
    public bestScoreLabel: Label = null;
    @property(Node)
    public newSprite: Node = null;

    //可不可以通过枚举来传奖牌
    //显示GameOverUI
    public show(curScore: number, bestScore: number) {
        this.node.active = true;
        this.curScoreLabel.string = curScore.toString();
        this.bestScoreLabel.string = bestScore.toString();
        if (curScore > bestScore) {
            this.newSprite.active = true;
        } else {
            this.newSprite.active = false;
        }
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


