import * as ed from '@noble/ed25519';
import { sha256 } from 'js-sha256';
import { sha512 } from '@noble/hashes/sha2';
import { Buffer } from 'buffer';
import 'react-native-get-random-values';

if (typeof ed.etc.sha512Sync === 'undefined') {
  ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));
  const sha512sync = ed.etc.sha512Sync;
  ed.etc.sha512Async = (...m) => Promise.resolve(sha512sync(...m));
}

// Ed25519 key pair type definition
export interface KeyPair {
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}

// Signature result type definition
export interface SignResult {
  hash: string;
  signature: string;
  publicKey: string;
}

/**
 * Generate Ed25519 key pair
 * @returns Object containing private and public keys
 */
export async function generateKeyPair(): Promise<KeyPair> {
  const privateKey = ed.utils.randomPrivateKey();
  const publicKey = await ed.getPublicKey(privateKey);

  return {
    privateKey,
    publicKey,
  };
}

/**
 * Hash and sign a message
 * @param message Message to sign
 * @param privateKey Private key (optional, will generate new key pair if not provided)
 * @returns Object containing hash, signature and public key
 */
export async function hashAndSign(message: string, privateKey?: Uint8Array): Promise<SignResult> {
  // 如果没有提供私钥，则生成新的密钥对
  let keyPair: KeyPair;
  if (privateKey) {
    const publicKey = await ed.getPublicKey(privateKey);
    keyPair = { privateKey, publicKey };
  } else {
    keyPair = await generateKeyPair();
  }

  // Calculate SHA-256 hash
  const messageBytes = new TextEncoder().encode(message);
  const hash = sha256(messageBytes);

  const hashBytes = new Uint8Array(ed.etc.hexToBytes(hash));
  const signature = await ed.sign(hashBytes, keyPair.privateKey);

  return {
    hash,
    signature: Buffer.from(signature).toString('base64'),
    publicKey: Buffer.from(keyPair.publicKey).toString('base64'),
  };
};

/**
 * Verify signature
 * @param message Original message
 * @param signature Signature to verify (base64)
 * @param publicKey Public key for verification (base64)
 * @returns Whether verification was successful
 */
export async function verifySignature(message: string, signature: string, publicKey: string): Promise<boolean> {
  try {
    // Calculate SHA-256 hash
    const messageBytes = new TextEncoder().encode(message);
    const hash = sha256(messageBytes);
    const hashBytes = new Uint8Array(ed.etc.hexToBytes(hash));

    // 解码 base64 格式的签名和公钥
    const signatureBytes = new Uint8Array(Buffer.from(signature, 'base64'));
    const publicKeyBytes = new Uint8Array(Buffer.from(publicKey, 'base64'));

    // 验证签名
    return await ed.verify(signatureBytes, hashBytes, publicKeyBytes);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Convert Uint8Array to base64 string
 * @param bytes Byte array
 * @returns base64 string
 */
export function bytesToBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64');
}

/**
 * Convert base64 string to Uint8Array
 * @param base64 base64 string
 * @returns Byte array
 */
export function base64ToBytes(base64: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64, 'base64'));
}
