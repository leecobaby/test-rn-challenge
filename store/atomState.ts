import { atom } from 'jotai';
import { SignResult } from '@/utils/crypto';

// Color theme state
export const colorSchemeAtom = atom<'light' | 'dark'>('light');

// Signature-related state
export const messageAtom = atom<string>('');
export const signResultAtom = atom<SignResult | null>(null);
export const isSigningAtom = atom<boolean>(false);

// Verification-related state
export const verifyMessageAtom = atom<string>('');
export const verifyPublicKeyAtom = atom<string>('');
export const verifySignatureAtom = atom<string>('');
export const verifyResultAtom = atom<boolean | null>(null);
export const isVerifyingAtom = atom<boolean>(false);

// Profile modal state
export const isProfileModalOpenAtom = atom<boolean>(false);

// Currently active tab
export const activeTabAtom = atom<string>('sign');

export const isProfileDrawerOpenAtom = atom<boolean>(false);
