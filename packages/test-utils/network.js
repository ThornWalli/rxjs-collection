import { vi } from 'vitest';

let _status = true;
export const mockOnline = () => {
  updateOnLineStatus('online', true);
};

export const mockOffline = () => {
  updateOnLineStatus('offline', false);
};

export const mock = () => {
  const navigator = Object();
  Object.defineProperty(navigator, 'onLine', {
    configurable: true,
    get: function () {
      return _status;
    }
  });

  vi.stubGlobal('navigator', navigator);
};

const updateOnLineStatus = (eventName, status) => {
  _status = status;

  const e = new window.Event(eventName, { bubbles: true, cancelable: false });
  window.dispatchEvent(e);
};
