import { v4 as createUuid } from "uuid";
import { Transaction } from "./Transaction";

export class User{
    private _id: string;
    private _transactions: Transaction[];

    constructor(private _name: string, private _cpf: string, private _email: string, private _age: number){
        this._id = createUuid();
        this._transactions = []
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public get email(): string {
        return this._email;
    }

    public get age(): number {
        return this._age;
    }

    public get transaction(): Transaction[] {
        return this._transactions;
    }

    public toJson() {
        return {
            id: this._id,
            name: this._name,
            cpf: this._cpf,
            email: this._email,
            age: this._age,
            transaction: this._transactions
        };
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public set cpf(newCpf: string) {
        this._cpf = newCpf;
    }

    public set email(newEmail: string) {
        this._email = newEmail;
    }

    public set age(newAge: number) {
        this._age = newAge;
    }

    // public set transaction(newTransaction: Transaction[]) {
    //     this._transactions = newTransaction;
    // }

    public set addTransaction(newTransaction: Transaction) {
        this._transactions.push(newTransaction);
    }
}