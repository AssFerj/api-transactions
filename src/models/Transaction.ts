import { v4 as createUuid } from "uuid";

export enum TypeTransaction {
    income = "Entrada",
    outcome = "Saída"
}

export class Transaction {
    private _id: string;

    constructor(private _title: string, private _value: number, private _type: TypeTransaction){
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

    public get type(): TypeTransaction {
        return this._type;
    }

    public toJsonT() {
        return {
            id: this._id,
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

    public set type(newType: TypeTransaction) {
        this._type = newType;
    }
}