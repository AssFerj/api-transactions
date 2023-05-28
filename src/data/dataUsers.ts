import { Transaction } from "../models/Transaction";
import { User } from "../models/User";

export const users = [
    new User('User1', '63750719098', 'user1@mail.com', 36),
    new User('User2', '58315147064', 'user2@mail.com', 28),
];

users[0].transaction.push(new Transaction('Salário', 1500, 'Depósito'));
users[0].transaction.push(new Transaction('Bônus', 500, 'Depósito'));
users[0].transaction.push(new Transaction('Aluguel', 500, 'Retirada'));
users[1].transaction.push(new Transaction('Salário', 1340, 'Depósito'));
users[1].transaction.push(new Transaction('Aluguel', 480, 'Retirada'));