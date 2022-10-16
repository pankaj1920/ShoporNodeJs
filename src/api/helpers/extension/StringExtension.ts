interface String {
    toInt(): number
}

String.prototype.toInt = function (): number { return parseInt(this) }

// Array.prototype.isEmpty = function (): Boolean { return this.length <= 0 }
