declare module 'hyperbee' {
  import { Hypercore } from 'hypercore';

  interface HyperbeeOptions {
    keyEncoding?: string;
    valueEncoding?: string;
  }

  interface HyperbeeGetResult<T = Record<string>> {
    key: string;
    value: T;
  }

  export default class Hyperbee<T = Record<string>> {
    constructor(feed: Hypercore<T>, options?: HyperbeeOptions);
    core: Hypercore<T>; 
    ready(): Promise<void>;
    
    put(key: string, value: T): Promise<void>;
    get(key: string): Promise<HyperbeeGetResult<T> | null>;
    del(key: string): Promise<void>;
    sub(name: string, options?: HyperbeeOptions): Hyperbee<T>;
  }
}
