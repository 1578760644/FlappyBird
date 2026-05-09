import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipeSpawner')
export class PipeSpawner extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    //生成速率
    @property
    spawnRate: number = 0.5;

    //通过计时器控制什么时候生成管道
    private timer: number = 0;

    start() {

    }

    update(deltaTime: number) {

        this.timer += deltaTime;
        if (this.timer > this.spawnRate) {
            //计时归零，重新计算
            this.timer = 0;
            //实例化管道
            const pipeInst = instantiate(this.pipePrefab);
            //以PipeSpawn为父节点添加
            this.node.addChild(pipeInst);

            //让PipeSpawner的世界坐标与pipe的世界坐标保持一致
            const p = this.node.getWorldPosition();
            pipeInst.setWorldPosition(p);

            //通过随机整数来修改y轴生成的高度，实现控制管道的上下
            const y = math.randomRangeInt(-300, 350);

            //本地高度通过修改本地坐标y实现
            const pLoca = pipeInst.getPosition();
            pipeInst.setPosition(pLoca.x, y)

        }
    }
}


