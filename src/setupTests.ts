// Polyfills and Jest DOM matchers
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import 'web-streams-polyfill/polyfill';

// Node built-ins for Jest environment
import { TextEncoder, TextDecoder } from 'util';

// Assign globals if missing (Jest runs in Node + jsdom)
if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Mock BroadcastChannel (MSW Node environment)
if (typeof global.BroadcastChannel === 'undefined') {
  // @ts-ignore
  global.BroadcastChannel = class {
    postMessage() {}
    addEventListener() {}
    removeEventListener() {}
    close() {}
  };
}
