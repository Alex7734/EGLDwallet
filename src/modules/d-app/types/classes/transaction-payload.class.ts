export class TransactionPayload {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  length(): number {
    return this.data.length;
  }

  encoded(): string {
    return encodeURIComponent(this.data);
  }

  toString(): string {
    return this.data;
  }

  valueOf(): Buffer {
    return Buffer.from(this.data);
  }
}
