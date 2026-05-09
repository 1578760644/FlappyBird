import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    //通过单例模式来管理速度
    private static _inst: GameManager = null;
    //相当于是get方法
    public static inst() {
        return this._inst;
    }

    @property
    public moveSpeed: number = 100;

    //在onload里面赋值，之后其他的程序是在start里面执行
    onLoad() {
        GameManager._inst = this;
    }

    update(deltaTime: number) {

    }
}


