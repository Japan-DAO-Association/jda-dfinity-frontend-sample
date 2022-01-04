import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import PlugConnect from '@psychedelic/plug-connect';
import { plug_front } from "../../declarations/plug_front";
import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { getAllUserNFTs } from '@psychedelic/dab-js'
import axios from "axios";

const App = () => {

  const nnsCanisterId = "rrkah-fqaaa-aaaaa-aaaaq-cai";

  const whitelist = [
    nnsCanisterId,
  ];

  const host = "https://mainnet.dfinity.network";

  const [connected, setConnected] = useState(false);

  const onBtnRequestBalance = async () => {
    console.log('onBtnRequestBalance() call');
    const response = await window.ic?.plug?.requestBalance();
    console.log(response);
  };

  const onBtnRequestTransfer = async () => {
    console.log('onBtnRequestTransfer() call');
    const to = document.getElementById("receiver-principal-id").value;
    const amount = Number(document.getElementById("amount").value.replaceAll('_', ''));
    const opts = new Object();
    opts.memo = document.getElementById("token-id").value;
    const requestTransferArg = {
      to,
      amount,
      opts,
    };

    if (!to) {
      console.log(`onBtnRequestTransfer() call failure, missing account id!`);
      return;
    };

    const response = await window.ic?.plug?.requestTransfer(requestTransferArg);
    console.log(`onBtnRequestTransfer() call response ${JSON.stringify(response)}`);
  };

  const mint = async () => {
    const principal = await window.ic.plug.getPrincipal();
    console.log(principal);

    const mintId = await plug_front.mint(principal, []);
    console.log(mintId);
  };

  const ownerOf = async () => {
    const ownerId = await plug_front.ownerOf(12n);
    console.log(ownerId);
  };

  const verifyConnectionAndAgent = async () => {
    const plugconnected = await window.ic.plug.isConnected();
    if (!plugconnected) window.ic.plug.requestConnect({ whitelist, host });
    if (plugconnected && !window.ic.plug.agent) {
      window.ic.plug.createAgent({ whitelist, host })
    }
  };

  // function getReceiverPrincipalId() {
  //   return els.receiverPrincipalId?.value;
  // }

  // const plugLogout = async () => {
  //   window.ic.plug.agent = null;
  //   window.ic?.plug?.deleteAgent();
  //   setConnected(false);
  // };

  useEffect(async () => {
    verifyConnectionAndAgent();
  }, []);

  return (
    <>
      {connected ? (
        <>
          <div className="container space-y-4">
            <div>
              <label className="text-gray-500 block">Send to address</label>
              <input id="receiver-principal-id" className="w-full border-2 rounded-md border-gray-300 p-2" />
            </div>
            <div>
              <label className="text-gray-500 block">Amount (e8s)</label>
              <input id="amount" className="w-full border-2 rounded-md border-gray-300 p-2" />
            </div>
            <div>
              <label className="text-gray-500 block">token id</label>
              <input id="token-id" className="w-full border-2 rounded-md border-gray-300 p-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 pb-6 mt-10">
            
            <div>
              <p className="text-base font-bold mb-4">Tokens</p>
              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    id="btn-request-balance"
                    className="
                      btn
                      w-full
                      transition
                      duration-300
                      bg-gray-300
                      hover:bg-gray-100
                      py-3
                      px-6"
                    onClick={onBtnRequestBalance}
                  >
                    requestBalance
                  </button>
                </div>
                <div>
                  <button
                    id="btn-request-transfer"
                    className="
                      btn
                      w-full
                      transition
                      duration-300
                      bg-gray-300
                      hover:bg-gray-100
                      py-3
                      px-6"
                    onClick={onBtnRequestTransfer}
                  >
                    requestTransfer
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-base font-bold mb-4">small nft</p>
              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    id="btn-connect"
                    className="
                      btn
                      w-full
                      transition
                      duration-300
                      bg-gray-300
                      hover:bg-gray-100
                      py-3
                      px-6"
                    onClick={mint}
                  >
                    mint
                  </button>
                </div>
                <div>
                  <button
                    id="dabnft"
                    className="
                      btn
                      w-full
                      transition
                      duration-300
                      bg-gray-300
                      hover:bg-gray-100
                      py-3
                      px-6"
                    onClick={ownerOf}
                  >
                    owner id
                  </button>
                </div>
              </div>
            </div>
          </div>

        </>
      ) : (
        <div className="flex justify-center">
        
          <PlugConnect
            host = {host}
            whitelist = {whitelist}
            onConnectCallback={() => setConnected(true)}
          />
          
        </div>
      )}
    </>
  );
};
  
render(<App />, document.getElementById("app"));