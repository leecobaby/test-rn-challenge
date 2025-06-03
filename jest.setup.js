// Jest setup file
import { sha512 } from '@noble/hashes/sha512';
import * as ed25519 from '@noble/ed25519';

// 配置 ed25519 使用 SHA-512
ed25519.etc.sha512Sync = (...m) => sha512(ed25519.etc.concatBytes(...m));

// Global test timeout
// eslint-disable-next-line no-undef
jest.setTimeout(10000);
