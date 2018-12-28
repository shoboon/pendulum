export default class StatusTransition {
    constructor(oldStatus, newStatus) {
        this.oldStatus = oldStatus
        this.newStatus = newStatus
    }
    isNone() {
        return this.oldStatus.equals(this.newStatus)
    }
    isStart() {
        return this.oldStatus.isReady() && this.newStatus.isStarted()
    }
    isEnd() {
        return this.oldStatus.isStarted() && this.newStatus.isEnded()
    }
}