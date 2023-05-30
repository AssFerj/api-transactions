import { v4 as createUuid } from "uuid";

export enum Type {
    income = "Entrada",
    outcome = "Saída"
}

export class Transaction {
    private _id: string;

    constructor(private _title: string, private _value: number, private _type: Type){
        this._id = createUuid();
    }

    public get id(): string{
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get value(): number {
        return this._value;
    }

    public get type(): Type {
        return this._type;
    }

    public toJsonT() {
        return {
            title: this._title,
            value: this._value,
            type: this._type
        }
    }

    public set title(newTitle: string) {
        this._title = newTitle;
    }

    public set value(newValue: number) {
        this._value = newValue;
    }

    public set type(newType: Type) {
        this._type = newType;
    }
}