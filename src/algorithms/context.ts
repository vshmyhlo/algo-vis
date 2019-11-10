export default class Context<T> {
  get: () => T;

  constructor() {
    this.get = () => {
      throw 'get called before set';
    }
  }

  set(value: T): Promise<null> {
    return new Promise<null>((resolve, reject) => {
      this.get = () => {
        resolve();
        return value;
      };
    });
  }
}
