export default class Fencer {
    constructor(type) {
        this.type = type
    }
    isBlack() {
        return this.type.isBlack()
    }
    isWhite() {
        return this.type.isWhite()
    }
}