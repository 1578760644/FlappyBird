import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('MoveBg')
export class MoveBg extends Component {
    @property(Node)
    public Bg01ToMove: Node | null = null;

    @property(Node)
    public Bg02ToMove: Node | null = null;

    //背景滚动速度
    private BgMoveSpeed: number;

    //判断背景是否可以滚动
    private _canScroll: boolean = false;

    start() {
        //通过单例模式获取速度
        this.BgMoveSpeed = GameManager.inst().moveSpeed;

    }

    //通过背景向左移动循环来实现背景滚动的效果，所有需要循环移动的素材都可以用此方法
    private backGroundScroll(deltaTime: number) {
        const moveDistance = this.BgMoveSpeed * deltaTime;
        let b1 = this.Bg01ToMove.getPosition();
        this.Bg01ToMove.setPosition(b1.x - moveDistance, b1.y);
        let b2 = this.Bg02ToMove.getPosition();
        this.Bg02ToMove.setPosition(b2.x - moveDistance, b2.y);

        //因为b1与b2是以715px循环的,把b1衔接在b2后面
        if (b1.x < -715) {
            b2 = this.Bg02ToMove.getPosition();
            this.Bg01ToMove.setPosition(b2.x + 715, b2.y);
        }
        if (b2.x < -715) {
            b1 = this.Bg01ToMove.getPosition();
            this.Bg02ToMove.setPosition(b1.x + 715, b1.y);
        }
    }

    update(deltaTime: number) {
        if (this._canScroll == false) return;
        //背景滚动
        this.backGroundScroll(deltaTime);
    }

    //控制是否可以滚动背景
    public enableScroll(){
        this._canScroll = true;
    }
    public disableScroll(){
         this._canScroll = false;
    }
}


