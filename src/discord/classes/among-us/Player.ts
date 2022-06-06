import { GuildMember } from "discord.js";
import PlayerAction from "../../enums/among-us/PlayerAction";
import PlayerColor from "../../enums/among-us/PlayerColor";
import PlayerState from "../../enums/among-us/PlayerState";
import PlayerType from "../../enums/among-us/PlayerType";

export default class Player {
    private _member: GuildMember|undefined;
    private _type: PlayerType;
    private _name: string;
    private _action: PlayerAction;
    private _isDead: PlayerState;
    private _disconnected: boolean;
    private _color: PlayerColor;

    constructor(params: {
        member?: GuildMember|undefined,
        type: PlayerType,
        name: string,
        action?: PlayerAction|undefined,
        isDead?: PlayerState|undefined,
        disconnected?: boolean,
        color: PlayerColor
    }) {
        if (params.member) this._member = params.member;
        if (params.action) this._action = params.action;
        if (params.isDead) this._isDead = params.isDead;
        if (params.disconnected) this._disconnected = params.disconnected;

        this._type = params.type;
        this._name = params.name;
        this._color = params.color;
    }

    public get member(): GuildMember|undefined { return this._member; }
    public set member(value: GuildMember|undefined) { this._member = value; }

    public get type(): PlayerType { return this._type; }
    public set type(value: PlayerType) { this._type = value; }

    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    public get action(): PlayerAction { return this._action; }
    public set action(value: PlayerAction) { this._action = value; }

    public get isDead(): PlayerState { return this._isDead; }
    public set isDead(value: PlayerState) { this._isDead = value; }

    public get disconnected(): boolean { return this._disconnected; }
    public set disconnected(value: boolean) { this._disconnected = value; }

    public get color(): PlayerColor { return this._color; }
    public set color(value: PlayerColor) { this._color = value; }

    public setMute(value: boolean): void {
        if (this.type === PlayerType.DISCORD) {
            this.member.voice.setMute(value);
        }
    }

    public setDeaf(value: boolean): void {
        if (this.type === PlayerType.DISCORD) {
            this.member.voice.setDeaf(value);
        }
    }
}
