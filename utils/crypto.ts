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

// Ed25519 密钥对类型定义
export interface KeyPair {
  privateKey: Uint8Array;
  publicKey: Uint8Array;
}

// 签名结果类型定义
export interface SignResult {
  hash: string;
  signature: string;
  publicKey: string;
}

/**
 * 生成 Ed25519 密钥对
 * @returns 返回包含私钥和公钥的对象
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
 * 对消息进行哈希和签名
 * @param message 要签名的消息
 * @param privateKey 私钥（可选，如果不提供则生成新的密钥对）
 * @returns 包含哈希值、签名和公钥的对象
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

  // 计算 SHA-256 哈希
  const messageBytes = new TextEncoder().encode(message);
  const hash = sha256(messageBytes);

  // 使用 Ed25519 签名哈希值
  const hashBytes = new Uint8Array(ed.etc.hexToBytes(hash));
  const signature = await ed.sign(hashBytes, keyPair.privateKey);

  return {
    hash,
    signature: Buffer.from(signature).toString('base64'),
    publicKey: Buffer.from(keyPair.publicKey).toString('base64'),
  };
}

/**
 * 验证签名
 * @param message 原始消息
 * @param signature 签名（base64编码）
 * @param publicKey 公钥（base64编码）
 * @returns 验证结果（布尔值）
 */
export async function verifySignature(message: string, signature: string, publicKey: string): Promise<boolean> {
  try {
    // 计算消息的 SHA-256 哈希
    const messageBytes = new TextEncoder().encode(message);
    const hash = sha256(messageBytes);
    const hashBytes = new Uint8Array(ed.etc.hexToBytes(hash));

    // 解码 base64 格式的签名和公钥
    const signatureBytes = new Uint8Array(Buffer.from(signature, 'base64'));
    const publicKeyBytes = new Uint8Array(Buffer.from(publicKey, 'base64'));

    // 验证签名
    return await ed.verify(signatureBytes, hashBytes, publicKeyBytes);
  } catch (error) {
    console.error('签名验证失败:', error);
    return false;
  }
}

/**
 * 将 Uint8Array 转换为 base64 字符串
 * @param bytes 字节数组
 * @returns base64 字符串
 */
export function bytesToBase64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64');
}

/**
 * 将 base64 字符串转换为 Uint8Array
 * @param base64 base64 字符串
 * @returns 字节数组
 */
export function base64ToBytes(base64: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64, 'base64'));
}
