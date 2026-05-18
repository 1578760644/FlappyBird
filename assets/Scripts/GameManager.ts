import { _decorator, AudioClip, Component, Label, Node } from 'cc';
import { Bird } from './Bird';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
import { GameReadyUI } from './UI/GameReadyUI';
import { GameData } from './GameData';
import { GameOverUI } from './UI/GameOverUI';
import { AudioMgr } from './AudioMgr';
const { ccclass, property } = _decorator;

//通过export枚举来控制游戏状态
export const enum GameState {
    READY,
    GAMING,
    GAMEOVER
}

@ccclass('GameManager')
export class GameManager extends Component {
    //通过单例模式来管理项目
    private static _inst: GameManager = null;
    //相当于是get方法
    public static inst() {
        if (this._inst == null) {
            this._inst = new GameManager();
        }
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
    @property(AudioClip)
    public bgAudio: AudioClip = null;
    @property(AudioClip)
    public gameOverAudio: AudioClip = null;

    curGS: GameState;

    //在onload里面赋值，之后其他的程序是在start里面执行
    onLoad() {
        GameManager._inst = this;
        // 强制清空所有本地存储
        // localStorage.clear();
        // console.log("LocalStorage has been cleared!");
    }
    protected start(): void {
        // 绑定回调
        this.bird.onCollideWithObstacle = () => {
            this.transitionToGameOverState();
        };
        this.bird.onPassPipe = () => {
            this.addScore();
        };

        this.transitionToReadyState();
        AudioMgr.inst.play(this.bgAudio, 0.5)
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
        //发生碰撞之后游戏结束，第二次碰撞就不再会调用了。Bird那边也写了if (this._isGameOver) return;作为双重保险
        if (this.curGS === GameState.GAMEOVER) return
        this.curGS = GameState.GAMEOVER
        // 通知小鸟游戏已结束，禁止后续碰撞响应
        this.bird.setGameOver();
        this.bird.disableControlNotRGD();   //通过不禁用刚体组件的方法来避免报错
        this.bgScroll.disableScroll();
        this.landScroll.disableScroll();
        this.pipespawn.gamePause();
        this.gameReadyUI.node.active = false;
        this.gamingUI.active = false;
        this.gameOverUI.node.active = true;
        this.gameOverUI.show(GameData.getScore(), GameData.getBestScore());
        // this.gameOverUI.show(0, 0);
        //游戏结束后要保存数据
        GameData.saveScore();
        //停止背景音乐并播放游戏失败声音
        AudioMgr.inst.stop();
        AudioMgr.inst.playOneShot(this.gameOverAudio, 0.5);
    }

    //得分了就调用此方法
    addScore() {
        //在GameManager里面调用GameData里增加分数的方法
        GameData.addScore();
        //调用方法获得得分给label组件
        this.scoreLabel.string = GameData.getScore().toString();
    }
}


