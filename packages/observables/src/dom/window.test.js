import { tap } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { connectionObservable } from './window.js';
import { mock as networkMock, mockOffline, mockOnline } from '../../../test-utils/network.js';
import { beforeEach, describe, it, expect, afterAll, vi } from 'vitest';

describe('DOM: window', function () {
  let testScheduler;

  beforeEach(function () {
    networkMock();

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).deep.equal(expected);
    });
  });

  afterAll(function () {
    vi.restoreAllMocks();
  });

  // HINT: https://betterprogramming.pub/rxjs-testing-write-unit-tests-for-observables-603af959e251
  it('online/offline detection', function () {
    testScheduler.run(helpers => {
      const expectedValues = {
        a: true,
        b: false,
        c: true,
        d: false
      };

      const triggerValues = {
        a: () => mockOnline(),
        b: () => mockOffline(),
        c: () => mockOnline(),
        d: () => mockOffline()
      };

      testScheduler.run(({ expectObservable, cold }) => {
        expectObservable(connectionObservable).toBe('a--b--c-----d', expectedValues);
        expectObservable(cold('---b--c-----d', triggerValues).pipe(tap(fn => fn())));
      });
    });
  });

  it('proof rerun online/offline detection', function () {
    testScheduler.run(helpers => {
      mockOnline(); // Muss wieder online, sonst wird false aus dem vorherigen Test übernommen.

      const expectedValues = {
        a: true,
        b: false,
        c: true,
        d: false
      };

      const triggerValues = {
        a: () => mockOnline(),
        b: () => mockOffline(),
        c: () => mockOnline(),
        d: () => mockOffline()
      };

      testScheduler.run(({ expectObservable, cold }) => {
        expectObservable(connectionObservable).toBe('a--b--c-----d', expectedValues);
        expectObservable(cold('---b--c-----d', triggerValues).pipe(tap(fn => fn())));
      });
    });
  });
});
