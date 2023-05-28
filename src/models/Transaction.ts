import { v4 as createUuid } from "uuid";

export class Transaction {
    private _id: string;

    constructor(private _title: string, private _value: number, private _type: string){
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

    public get type(): string {
        return this._type;
    }

    public toJson() {
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

    public set type(newType: string) {
        this._type = newType;
    }
}