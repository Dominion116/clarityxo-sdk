import { vi, describe, it, expect } from 'vitest';
import { debug } from '../src/utils/log';

describe('debug logger', () => {
  it('calls console.debug when DEBUG is enabled', () => {
    const orig = process.env.DEBUG;
    process.env.DEBUG = '1';
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {} as any);

    debug('test-message', { a: 1 });

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
    process.env.DEBUG = orig;
  });
});
