import Context from './context';

export abstract class Action {
}

export class SelectSubset extends Action {
  constructor(public lo: number, public hi: number) {
    super()
  }
}

export class Update<T> extends Action {
  constructor(public seq: T[]) {
    super()
  }
}

export class Swap extends Action {
  constructor(public i: number, public j: number) {
    super()
  }
}

export class Done extends Action {
}

export async function quickSort<T>(seq: T[], context: Context<Action>): Promise<T[]> {
  const res = await quickSubSort([...seq], 0, seq.length, context);
  await context.set(new Done());
  return res;
}

async function quickSubSort<T>(seq: T[], lo: number, hi: number, context: Context<Action>): Promise<T[]> {
  if ((hi - lo) <= 1) {
    return seq;
  }

  const mid = await partition(seq, lo, hi, context);

  await context.set(new SelectSubset(lo, mid));
  await quickSubSort(seq, lo, mid, context);
  await context.set(new SelectSubset(mid + 1, hi));
  await quickSubSort(seq, mid + 1, hi, context);

  return seq;
}

async function partition<T>(seq: T[], lo: number, hi: number, context: Context<Action>): Promise<number> {
  const k = lo;
  let i = lo + 1;
  let j = hi - 1;

  while (true) {

    while (seq[i] < seq[k] && i < hi - 1) {
      i += 1
    }

    while (seq[k] <= seq[j] && lo < j) {
      j -= 1
    }

    if (j <= i) {
      break
    }

    await swap(seq, i, j, context);
  }

  await swap(seq, j, k, context);

  return j
}

async function swap<T>(seq: T[], i: number, j: number, context: Context<Action>): Promise<void> {
  await context.set(new Swap(i, j));
  [seq[i], seq[j]] = [seq[j], seq[i]];
  await context.set(new Update(seq))
}
