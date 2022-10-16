interface Array<T> {
    isEmpty(): Boolean
    isNotEmpty(): Boolean
    first(): any
}


Array.prototype.isEmpty = function (): Boolean { return this.length <= 0 }

Array.prototype.isNotEmpty = function (): Boolean { return this.length > 0 }

Array.prototype.first = function (): {} { return this[0] }