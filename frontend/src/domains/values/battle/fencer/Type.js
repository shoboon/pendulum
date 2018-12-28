const BLACK = 'black'
const WHITE = 'white'
const TYPES = [BLACK, WHITE]

export default class Type {
    constructor(type) {
        if (! TYPES.includes(type)) {
            throw new Errpr('Unsupported type: ' + type)
        }
        this.value = type
    }
    isBlack() {
        return this.value === BLACK
    }
    isWhite() {
        return this.value === WHITE
    }
    equals(type) {
        return this.value === type.value
    }
}