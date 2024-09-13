import { vi } from 'vitest';

let _status = true;
export const mockOnline = () => {
  updateOnLineStatus('online', true);
};

export const mockOffline = () => {
  updateOnLineStatus('offline', false);
};

export const mock = () => {
  vi.spyOn(navigator, 'onLine', 'get').mockImplementation(() => _status);
};

const updateOnLineStatus = (eventName, status) => {
  _status = status;

  const e = new window.Event(eventName, { bubbles: true, cancelable: false });
  window.dispatchEvent(e);
};
