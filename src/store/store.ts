import { writable } from 'svelte/store';
import { Difficulties } from '../models/difficulties';
import { Operations } from '../models/operations';

export const attempts = writable(0);
export const errors = writable(0);
export const settings = writable({
    difficulty: Difficulties.easy,
    operation : Operations.add
})