"use strict";
class HashMap {
    constructor(size = 16) {
        this.loadFactor = 0.75;
        this.map = new Array(size);
        this.size = size;
    }
    _hash(key) {
        let hash = 0;
        const primeNumber = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            hash = (hash * primeNumber + key.charCodeAt(i)) % this.map.length;
        }
        return hash;
    }
    arrayLoad() {
        let counter = 0;
        this.map.forEach((item) => {
            if (item) {
                counter++;
            }
        });
        if (counter > this.size * this.loadFactor) {
            this.size *= 2;
        }
    }
    set(key, value) {
        if (this.keys().includes(key)) {
            this.override(key, value);
            return;
        }
        this.arrayLoad();
        if (this.size > this.map.length) {
            this.map.push(...new Array(this.map.length));
        }
        const index = this._hash(key);
        if (!this.map[index]) {
            this.map[index] = [];
        }
        this.map[index].push([key, value]);
    }
    get(key) {
        const index = this._hash(key);
        if (this.map[index]) {
            for (let subarray of this.map[index]) {
                if (subarray[0] === key) {
                    return subarray[1];
                }
            }
        }
        return null;
    }
    override(key, value) {
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (this.map[i][j][0].includes(key)) {
                        this.map[i][j][1] = value;
                    }
                }
            }
        }
    }
    has(key) {
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i] && this.map[i][0] !== undefined) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (this.map[i][j][0].includes(key)) {
                        return true;
                    }
                }
            }
        }
    }
    values() {
        const values = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (!values.includes(this.map[i][j][1])) {
                        values.push(this.map[i][j][1]);
                    }
                }
            }
        }
        return values;
    }
    keys() {
        const values = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (!values.includes(this.map[i][j][0])) {
                        values.push(this.map[i][j][0]);
                    }
                }
            }
        }
        return values;
    }
    length() {
        return this.keys().length - 1;
    }
    entries() {
        const allEntries = [];
        this.map.forEach((entry) => {
            if (entry) {
                allEntries.push(entry);
            }
        });
        return allEntries.flat();
    }
    clear() {
        this.map = [];
    }
    remove(key) {
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i]) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (this.map[i][j][0] === key) {
                        this.map[i][j] = undefined;
                        return true;
                    }
                }
            }
        }
    }
}
const hash = new HashMap(16);
//# sourceMappingURL=index.js.map