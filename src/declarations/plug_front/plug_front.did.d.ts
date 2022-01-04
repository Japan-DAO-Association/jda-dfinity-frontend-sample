import type { Principal } from '@dfinity/principal';
export interface Attribute { 'key' : string, 'value' : string }
export interface Small_NFT {
  'mint' : (arg_0: Principal, arg_1: [] | [TokenMetadata]) => Promise<TokenID>,
  'ownerOf' : (arg_0: TokenID) => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: TokenID) => Promise<TokenID>,
}
export type TokenID = bigint;
export interface TokenMetadata { 'attributes' : [] | [Array<Attribute>] }
export interface _SERVICE extends Small_NFT {}
