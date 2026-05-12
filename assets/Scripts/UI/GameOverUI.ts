import { _decorator, Component, director, Input, input, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
import { GameData } from '../GameData';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {

    @property(Label)
    public curScoreLabel: Label = null;
    @property(Label)
    public bestScoreLabel: Label = null;
    @property(Node)
    public newSprite: Node = null;

    //通过数组来存放奖牌
    @property([Node])
    public medalArray: Node[] = [];

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
        //通过索引来判断显示哪个奖牌，得到的分数除以10，然后去掉后面小数，就可以调用索引是就显示出来
        // 0 - 9白牌
        // 10 - 19铜牌
        // 20 - 29银牌
        // 30 - xx金牌
        const index = curScore / 10;
        let indexInt = Math.floor(index); //通过floor方法返回不大于其数值参数的最大整数。
        if (indexInt > 3) { //超出39分后也显示金牌
            indexInt = 3;
        }
        this.medalArray[indexInt].active = true;
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
    onPlayButtonClick() {
        // 通过loadScene重新加载当前场景，用getScene.name获取当当前场景名字
        director.loadScene(director.getScene().name);
        //需要把curScore分数清零
        GameData.setScore();
    }
}


