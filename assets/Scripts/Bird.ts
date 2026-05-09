import { _decorator, Animation, Collider2D, Component, Contact2DType, Input, input, IPhysics2DContact, Node, RigidBody, RigidBody2D, Vec2 } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

//通过枚举来控制小鸟得分
enum ColliderType {
    LAND,
    PIPE,
    PIPE_MID

}


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

    //判断小鸟是否可以被控制
    private _canControl: boolean = false;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);

        //注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this)
        }
        //获取到当前的刚体组件
        this.rgd2D = this.getComponent(RigidBody2D);
    }

    start() {
    }

    onTouchStart() {
        if (this._canControl == false) return;
        //控制小鸟上下
        this.rgd2D.linearVelocity = new Vec2(0, this.upDistance)
        //让小鸟抬头 angle本地坐标系下的旋转，用欧拉角表示，但是限定在 z 轴上。
        this.node.angle = this.UpAngle;
    }

    update(deltaTime: number) {
        if (this._canControl == false) return;
        //无论是向上还是向下，本质上还是旋转
        this.node.angle -= this.DownAngle * deltaTime;
        //#region
        // //保证下落角度不超过-60度，实际经过测试基本上都到不了-50度，所以可以不写
        // if (this.node.angle < -60) {
        //     this.node.angle = -60;
        // }
        //#endregion

    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);

        let collider = this.getComponent(Collider2D)
        if (collider) {
            collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
            collider.off(Contact2DType.END_CONTACT, this.onEndContact, this)
        }
    }

    //对外界提供2个方法来启用控制和禁用控制
    public enableControl() {
        this._canControl = true;
        this.rgd2D.enabled = true;
        this.getComponent(Animation).enabled = true;
    }
    public disableControl() {
        this._canControl = false;
        this.rgd2D.enabled = false; //禁用刚体组件
        this.getComponent(Animation).enabled = false; //禁用动画组件
    }

    onBeginContact(selfConllider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log(otherCollider.tag) //用于检测是否发生碰撞
        if (otherCollider.tag === ColliderType.LAND || ColliderType.PIPE) {
            GameManager.inst().transitionToGameOverState();
        }
    }
    onEndContact(selfConllider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //当小鸟离开管道的时候触发得分
        if (otherCollider.tag === ColliderType.PIPE_MID) {
            GameManager.inst().addScore();
        }
    }
}


