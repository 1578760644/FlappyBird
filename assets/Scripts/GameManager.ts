import { _decorator, Component, Label, Node } from 'cc';
import { Bird } from './Bird';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
import { GameOverUI } from './UI/GameOverUI';
const { ccclass, property } = _decorator;

//通过枚举来控制游戏状态
enum GameState {
    READY,
    GAMING,
    GAMEOVER
} //目前还没有用到

@ccclass('GameManager')
export class GameManager extends Component {
    //通过单例模式来管理项目
    private static _inst: GameManager = null;
    //相当于是get方法
    public static inst() {
        return this._inst;
    }

    //背景滚动速度
    @property
    public moveSpeed: number = 100;

    //引用组件
    @property(Bird)
    public bird: Bird = null;
    @property(MoveBg)
    public bgScroll: MoveBg = null;
    @property(MoveBg)
    public landScroll: MoveBg = null;
    @property(PipeSpawner)
    public pipespawn: PipeSpawner = null;
    @property(GameReadyUI)
    public gameReadyUI: GameReadyUI = null;
    @property(Node)
    public gamingUI: Node = null;
    @property(Label)
    public scoreLabel: Label = null;
    @property(GameOverUI)
    public gameOverUI: GameOverUI = null;

    curGS: GameState;

    //在onload里面赋值，之后其他的程序是在start里面执行
    onLoad() {
        GameManager._inst = this;
    }
    protected start(): void {
        this.transitionToReadyState();
    }

    //通过三个方法来控制游戏的开始和结束
    transitionToReadyState() {
        this.curGS = GameState.READY
        this.bird.disableControl();
        this.bgScroll.disableScroll();
        this.landScroll.disableScroll();
        this.pipespawn.gamePause();
        this.gameReadyUI.node.active = true;
        this.gamingUI.active = false;
        this.gameOverUI.node.active = false;
    }
    transitionToGamingState() {
        this.curGS = GameState.GAMING
        this.bird.enableControl();
        this.bgScroll.enableScroll();
        this.landScroll.enableScroll();
        this.pipespawn.gameStart();
        this.gameReadyUI.node.active = false; //通过禁用节点来让UI消失
        this.gamingUI.active = true;
        this.gameOverUI.node.active = false;
    }
    transitionToGameOverState() {
        this.curGS = GameState.GAMEOVER
        this.bird.disableControl();
        this.bgScroll.disableScroll();
        this.landScroll.disableScroll();
        this.pipespawn.gamePause();
        this.gameReadyUI.node.active = false;
        this.gamingUI.active = false;
        this.gameOverUI.node.active = true;
        this.gameOverUI.show(0, 0)
    }

    //得分了就调用此方法
    addScore(count: number = 1) {
        //在GameManager里面调用GameData里增加分数的方法
        GameData.addScore();
        //调用方法获得得分给label组件
        this.scoreLabel.string = GameData.getScore().toString();
    }
}


