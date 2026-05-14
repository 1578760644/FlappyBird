import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//使用GameData来进行数据的存储与管理
export class GameData {

    //通过常量来存储数据
    private static readonly BESTSCORE: string = "BestScore";

    private static _score: number = 0;

    //通过调用此方法默认添加1分
    public static addScore(count: number = 1) {
        this._score += count;
    }

    //更新UI需要访问分数,指定方法类型
    public static getScore(): number {
        return this._score;
    }
    public static setScore(): number {
        return this._score = 0;
    }

    //存在本地的最高分
    public static getBestScore() {
        //用来存储分数
        let score = localStorage.getItem(this.BESTSCORE)
        //第一次运行游戏的时候是取不到数据的，所以最开始需要做判断
        if (score) { //如果score不为空，就返回int类型的score
            return parseInt(score)
        } else {  //否则默认最高分就是0分
            return 0
        }
    }

    //判断如果是新的分数就存储起来
    public static saveScore() {
        let curScore = this.getScore();
        let bestScore = this.getBestScore();
        if (curScore > bestScore) { //int类型判断完后，再转换为string类型存储。localStorage 只能存储字符串类型。
            localStorage.setItem(this.BESTSCORE, curScore.toString());
        }
    }
}


