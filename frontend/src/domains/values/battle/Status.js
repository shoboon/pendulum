const READY = 'ready'
const STARTED = 'started'
const ENDED = 'ended'
const STATUSES = [READY, STARTED, ENDED]

export default class Status {
    constructor(value = READY) {
        if (! STATUSES.includes(value)) {
            throw new Error("Unsupported status: " + value);
        }
        this.value = value
    }
    isReady() {
        return this.value === READY
    }
    isStarted() {
        return this.value === STARTED
    }
    isEnded() {
        return this.value === ENDED
    }
    equals(status) {
        return this.value === status.value
    }
}