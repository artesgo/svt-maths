export class UID {
    private static id = 0;
    static getCurrentId() {
        return UID.id;
    }
    static createId() {
        console.log(UID.id)
        return UID.id++;
    }
}