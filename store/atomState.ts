import { atom } from 'jotai';
import { SignResult } from '@/utils/crypto';

// 颜色主题状态
export const colorSchemeAtom = atom<'light' | 'dark'>('light');

// 签名相关状态
export const messageAtom = atom<string>('');
export const signResultAtom = atom<SignResult | null>(null);
export const isSigningAtom = atom<boolean>(false);

// 验证相关状态
export const verifyMessageAtom = atom<string>('');
export const verifyPublicKeyAtom = atom<string>('');
export const verifySignatureAtom = atom<string>('');
export const verifyResultAtom = atom<boolean | null>(null);
export const isVerifyingAtom = atom<boolean>(false);

// Profile模态框状态
export const isProfileModalVisibleAtom = atom<boolean>(false);

// 当前激活的标签页
export const activeTabAtom = atom<'sign' | 'verify'>('sign');
