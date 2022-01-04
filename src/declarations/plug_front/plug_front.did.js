export const idlFactory = ({ IDL }) => {
  const Attribute = IDL.Record({ 'key' : IDL.Text, 'value' : IDL.Text });
  const TokenMetadata = IDL.Record({
    'attributes' : IDL.Opt(IDL.Vec(Attribute)),
  });
  const TokenID = IDL.Nat;
  const Small_NFT = IDL.Service({
    'mint' : IDL.Func([IDL.Principal, IDL.Opt(TokenMetadata)], [TokenID], []),
    'ownerOf' : IDL.Func([TokenID], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, TokenID], [TokenID], []),
  });
  return Small_NFT;
};
export const init = ({ IDL }) => { return []; };
