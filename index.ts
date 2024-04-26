class HashMap<T> {
  map: T[][] | T[];
  loadFactor: number = 0.75;
  size: number;
  constructor(size: number = 16) {
    this.map = new Array<T>(size);
    this.size = size;
  }

  _hash(key: string) {
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
  set(key: string, value: T) {
    if (this.keys().includes(key as T)) {
      this.override(key, value);
      return;
    }
    this.arrayLoad();
    if (this.size > this.map.length) {
      this.map.push(...new Array(this.map.length));
    }

    const index = this._hash(key);
    if (!this.map[index]) {
      (this.map[index] as T[][]) = [];
    }
    (this.map[index] as T[][]).push([key as T, value]);
  }
  get(key: string) {
    const index = this._hash(key);
    if (this.map[index]) {
      for (let subarray of this.map[index] as T[]) {
        if ((subarray as string)[0] === key) {
          return (subarray as T[])[1];
        }
      }
    }
    return null;
  }
  override(key: string, value: T) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < (this.map[i] as T[]).length; j++) {
          if (this.map[i][j][0].includes(key)) {
            this.map[i][j][1] = value;
          }
        }
      }
    }
  }
  has(key: string) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i] && (this.map[i] as T[])[0] !== undefined) {
        for (let j = 0; j < (this.map[i] as T[]).length; j++) {
          if (this.map[i][j][0].includes(key)) {
            return true;
          }
        }
      }
    }
  }
  values() {
    const values: T[] = [];
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < (this.map[i] as T[]).length; j++) {
          if (!values.includes((this.map as T[][][])[i][j][1])) {
            values.push((this.map as T[][][])[i][j][1]);
          }
        }
      }
    }
    return values;
  }
  keys() {
    const values: T[] = [];
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < (this.map[i] as T[]).length; j++) {
          if (!values.includes(this.map[i][j][0])) {
            values.push((this.map as T[][][])[i][j][0]);
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
    const allEntries: T[] = [];
    this.map.forEach((entry) => {
      if (entry) {
        allEntries.push(entry as T);
      }
    });
    return allEntries.flat();
  }
  clear() {
    this.map = [];
  }
  remove(key: string) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i]) {
        for (let j = 0; j < (this.map[i] as T[]).length; j++) {
          if (this.map[i][j][0] === key) {
            this.map[i][j] = undefined;
            return true;
          }
        }
      }
    }
  }
}

const hash = new HashMap<string>(16);
