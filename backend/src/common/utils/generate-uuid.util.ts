import { randomUUID } from 'node:crypto';

type UUID = `${string}-${string}-${string}-${string}-${string}`;

export default function generateUUID(): UUID {
    return randomUUID();
}
