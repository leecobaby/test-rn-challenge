import { hashAndSign, verifySignature, generateKeyPair, bytesToBase64, base64ToBytes } from '../utils/crypto';

describe('Crypto Utils', () => {
  const testMessage = 'Hello, World! 这是一个测试消息。';

  describe('generateKeyPair', () => {
    it('should generate a valid key pair', async () => {
      const keyPair = await generateKeyPair();

      expect(keyPair.privateKey).toBeInstanceOf(Uint8Array);
      expect(keyPair.publicKey).toBeInstanceOf(Uint8Array);
      expect(keyPair.privateKey.length).toBe(32);
      expect(keyPair.publicKey.length).toBe(32);
    });

    it('should generate different key pairs each time', async () => {
      const keyPair1 = await generateKeyPair();
      const keyPair2 = await generateKeyPair();

      expect(keyPair1.privateKey).not.toEqual(keyPair2.privateKey);
      expect(keyPair1.publicKey).not.toEqual(keyPair2.publicKey);
    });
  });

  describe('hashAndSign', () => {
    it('should hash and sign a message', async () => {
      const result = await hashAndSign(testMessage);

      expect(result.hash).toBeDefined();
      expect(result.signature).toBeDefined();
      expect(result.publicKey).toBeDefined();

      // SHA-256 哈希应该是64字符的十六进制字符串
      expect(result.hash).toMatch(/^[a-f0-9]{64}$/);

      // Base64 编码的签名和公钥
      expect(result.signature).toMatch(/^[A-Za-z0-9+/]+=*$/);
      expect(result.publicKey).toMatch(/^[A-Za-z0-9+/]+=*$/);
    });

    it('should produce consistent hash for same message', async () => {
      const result1 = await hashAndSign(testMessage);
      const result2 = await hashAndSign(testMessage);

      // 相同消息应该产生相同的哈希
      expect(result1.hash).toBe(result2.hash);

      // 但是签名应该不同（因为使用了不同的密钥对）
      expect(result1.signature).not.toBe(result2.signature);
      expect(result1.publicKey).not.toBe(result2.publicKey);
    });

    it('should work with provided private key', async () => {
      const keyPair = await generateKeyPair();
      const result1 = await hashAndSign(testMessage, keyPair.privateKey);
      const result2 = await hashAndSign(testMessage, keyPair.privateKey);

      // 使用相同私钥应该产生相同的签名和公钥
      expect(result1.signature).toBe(result2.signature);
      expect(result1.publicKey).toBe(result2.publicKey);
      expect(result1.hash).toBe(result2.hash);
    });
  });

  describe('verifySignature', () => {
    it('should verify a valid signature', async () => {
      const signResult = await hashAndSign(testMessage);
      const isValid = await verifySignature(testMessage, signResult.signature, signResult.publicKey);

      expect(isValid).toBe(true);
    });

    it('should reject invalid signature', async () => {
      const signResult = await hashAndSign(testMessage);
      const invalidSignature = 'invalidSignature123';

      const isValid = await verifySignature(testMessage, invalidSignature, signResult.publicKey);

      expect(isValid).toBe(false);
    });

    it('should reject signature with wrong message', async () => {
      const signResult = await hashAndSign(testMessage);
      const wrongMessage = 'Different message';

      const isValid = await verifySignature(wrongMessage, signResult.signature, signResult.publicKey);

      expect(isValid).toBe(false);
    });

    it('should reject signature with wrong public key', async () => {
      const signResult = await hashAndSign(testMessage);
      const wrongKeyPair = await generateKeyPair();
      const wrongPublicKey = bytesToBase64(wrongKeyPair.publicKey);

      const isValid = await verifySignature(testMessage, signResult.signature, wrongPublicKey);

      expect(isValid).toBe(false);
    });

    it('should handle malformed inputs gracefully', async () => {
      const isValid1 = await verifySignature('test', 'invalid-base64!', 'invalid-base64!');
      const isValid2 = await verifySignature('test', '', '');

      expect(isValid1).toBe(false);
      expect(isValid2).toBe(false);
    });
  });

  describe('Base64 conversion utilities', () => {
    it('should convert bytes to base64 and back', () => {
      const originalBytes = new Uint8Array([1, 2, 3, 4, 5, 255, 128, 0]);
      const base64String = bytesToBase64(originalBytes);
      const convertedBytes = base64ToBytes(base64String);

      expect(convertedBytes).toEqual(originalBytes);
    });

    it('should handle empty bytes', () => {
      const emptyBytes = new Uint8Array([]);
      const base64String = bytesToBase64(emptyBytes);
      const convertedBytes = base64ToBytes(base64String);

      expect(convertedBytes).toEqual(emptyBytes);
    });
  });

  describe('Integration test', () => {
    it('should complete full sign and verify workflow', async () => {
      // 1. 生成密钥对
      const keyPair = await generateKeyPair();

      // 2. 签名消息
      const signResult = await hashAndSign(testMessage, keyPair.privateKey);

      // 3. 验证签名
      const isValid = await verifySignature(testMessage, signResult.signature, signResult.publicKey);

      expect(isValid).toBe(true);

      // 4. 确保公钥匹配
      expect(signResult.publicKey).toBe(bytesToBase64(keyPair.publicKey));
    });

    it('should work with Unicode messages', async () => {
      const unicodeMessage = '你好世界 🌍 Hello नमस्ते مرحبا';
      const signResult = await hashAndSign(unicodeMessage);
      const isValid = await verifySignature(unicodeMessage, signResult.signature, signResult.publicKey);

      expect(isValid).toBe(true);
    });

    it('should work with empty message', async () => {
      const emptyMessage = '';
      const signResult = await hashAndSign(emptyMessage);
      const isValid = await verifySignature(emptyMessage, signResult.signature, signResult.publicKey);

      expect(isValid).toBe(true);
    });

    it('should work with long message', async () => {
      const longMessage = 'A'.repeat(10000); // 10KB 消息
      const signResult = await hashAndSign(longMessage);
      const isValid = await verifySignature(longMessage, signResult.signature, signResult.publicKey);

      expect(isValid).toBe(true);
    });
  });
});
