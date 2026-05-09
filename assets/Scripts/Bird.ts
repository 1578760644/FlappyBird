import { _decorator, Component, Input, input, Node, RigidBody, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    //向上移动距离
    @property
    public upDistance: number = 10;
    //向上抬头角度
    @property
    public UpAngle: number = 30;
    //向下掉落角度
    @property
    public DownAngle: number = 30;

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
        //控制小鸟上下
        this.rgd2D.linearVelocity = new Vec2(0, this.upDistance)
        //让小鸟抬头 angle本地坐标系下的旋转，用欧拉角表示，但是限定在 z 轴上。
        this.node.angle = this.UpAngle;
    }

    update(deltaTime: number) {
        //无论是向上还是向下，本质上还是旋转
        this.node.angle -= this.DownAngle * deltaTime;
        // //保证下落角度不超过-60度，实际经过测试基本上都到不了-50度，所以可以不写
        // if (this.node.angle < -60) {
        //     this.node.angle = -60;
        // }

    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }
}


