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

    //用来储存已经生成的管道，销毁要使用到
    private pipes: Node[] = [];

    start() {

    }

    pipeRandomSpawn(deltaTime: number) {
        this.timer += deltaTime;
        if (this.timer > this.spawnRate) {
            //计时归零，重新计算
            this.timer = 0;
            //实例化管道
            const pipeInst = instantiate(this.pipePrefab);
            //以PipeSpawn为父节点添加
            this.node.addChild(pipeInst);

            //存放到数组
            this.pipes.push(pipeInst);

            //让PipeSpawner的世界坐标与pipe的世界坐标保持一致
            const p = this.node.getWorldPosition();
            pipeInst.setWorldPosition(p);

            //通过随机整数来修改y轴生成的高度，实现控制管道的上下
            const y = math.randomRangeInt(-250, 300);

            //管道口本地高度通过修改本地坐标y实现
            const pLoca = pipeInst.getPosition();
            pipeInst.setPosition(pLoca.x, y)

        }
    }

    update(deltaTime: number) {
        //随机生成管道
        this.pipeRandomSpawn(deltaTime)
        this.checkPipesOutOfScreen();
    }

    //检查并销毁管道
    checkPipesOutOfScreen() {
        //倒叙遍历
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i]
            //获取世界坐标
            const worldPos = pipe.getWorldPosition();

            // 坐标在管道的中心，所以还需要额外给一点距离让管道消除
            if (worldPos.x < -100) {
                pipe.destroy();           // 销毁节点
                this.pipes.splice(i, 1); // 从数组中移除
            }
        }
    }

}
