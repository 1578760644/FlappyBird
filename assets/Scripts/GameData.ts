import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

//使用GameData来进行数据的存储与管理
export class GameData {
    private static _score: number = 0;

    //通过调用此方法默认添加1分
    public static addScore(count: number = 1) {
        this._score += count;
    }

    //更新UI需要访问分数,指定方法类型
    public static getScore(): number {
        return this._score;
    }
}


