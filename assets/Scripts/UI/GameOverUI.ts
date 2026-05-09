import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameOverUI')
export class GameOverUI extends Component {
    //可不可以通过枚举来传奖牌
    //显示GameOverUI
    public show(curScore: number, bestScore: number) {
        this.node.active = true;
    }
}


