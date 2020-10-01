import { place } from "../models/place";
import { UID } from "../utils/uid";

export function getPosition(arr, index) {
    // what is the length of the array
    const length = arr.length;
    const places = place.slice(0,length).reverse();
    return places[index];
}

export function getDigits(num: number): {id: number, digit: string}[] {
    return appendUid(num.toString().split(''));
}

export function appendUid(digits: string[]): {id: number, digit: string}[] {
    return digits.map(digit => ({
        digit,
        id: UID.createId()
    }))
}