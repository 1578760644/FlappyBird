import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {


    private PipemoveSpeed: number;

    start() {
        this.PipemoveSpeed = GameManager.inst().moveSpeed;
    }

    update(deltaTime: number) {
        const p = this.node.position;
        this.node.setPosition(p.x - this.PipemoveSpeed * deltaTime, p.y)
    }
}


