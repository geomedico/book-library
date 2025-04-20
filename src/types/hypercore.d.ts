declare module 'hypercore' {
  import { EventEmitter } from 'events';
  import { AbstractEncoding } from 'abstract-encoding';

  export interface HypercoreOptions<T = Record<string>> {
    createIfMissing?: boolean;
    overwrite?: boolean;
    sparse?: boolean;
    valueEncoding?: string | AbstractEncoding<T>;
    encoding?: string | AbstractEncoding<T>;
    secretKey?: Buffer;
    encryptionKey?: Buffer;
  }

  export default class Hypercore<T = Record<string>> extends EventEmitter {
    constructor(storage: string | (() => T), options?: HypercoreOptions<T>);

    ready(): Promise<void>;
    get(index: number, options?: Record<string>): Promise<T>;
    append(data: T): Promise<number>;
    length: number;
    key: Buffer;
    discoveryKey: Buffer;
    writable: boolean;
    readable: boolean;
    closed: boolean;
    close(): Promise<void>;
  }
}
