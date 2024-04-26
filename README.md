# Very Basic implementation of a Hash Table with TypeScript

## with Separate Chaining

# My hash method:

```
_hash(key: string) {
    let hash = 0;
    const primeNumber = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      hash = (hash * primeNumber + key.charCodeAt(i)) % this.map.length;
    }
    return hash;
  }
```

the class includes the following methods:

- set(key, value): void
- get(key): array
- has(key): bool
- values(): array
- keys(): array
- length(): number
- clear(): void
- remove(key): void
