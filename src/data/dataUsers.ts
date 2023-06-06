import { Transaction, TypeTransaction } from "../models/Transaction";
import { User } from "../models/User";

export const users = [
    new User('User1', '63750719098', 'user1@mail.com', 36),
    new User('User2', '58315147064', 'user2@mail.com', 28),
];

users[0].transaction.push(new Transaction('Salário', 1500, TypeTransaction.income));
users[0].transaction.push(new Transaction('Bônus', 500, TypeTransaction.income));
users[0].transaction.push(new Transaction('Aluguel', 500, TypeTransaction.outcome));
users[1].transaction.push(new Transaction('Salário', 1340, TypeTransaction.income));
users[1].transaction.push(new Transaction('Aluguel', 480, TypeTransaction.outcome));