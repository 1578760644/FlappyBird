import { _decorator, Component, Input, input, Node, RigidBody, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property
    public upDistance: number = 10;

    //获取刚体组件，然后通过给刚体组件施加向上的线性速度来实现小鸟向上飞行的操作
    private rgd2D: RigidBody2D = null;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    start() {
        //获取到当前的刚体组件
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    onTouchStart() {
        this.rgd2D.linearVelocity = new Vec2(0, this.upDistance)
    }

    update(deltaTime: number) {

    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
}


