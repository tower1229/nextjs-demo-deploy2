"use client";
import InputCollectionAddress from "../components/InputCollectionAddress";
import MultiSelector from "../components/MultiSelector";
import SearchId from "../components/SearchId";
import SwitchListType from "../components/SwitchListType";
import NFTCardList from "../components/NFTCardList";
import NFTTableList from "../components/NFTTableList";
import { Button } from "antd";
import { useState, useMemo, useReducer } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import { shortenAddress } from "../utils/common";
import { NFTInfo } from "../constant/type";

export default function Home() {
  const [listType, setlistType] = useState<1 | 2>(1);
  const [dataList, setDataList] = useState<NFTInfo[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const { open, close } = useWeb3Modal();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const batchSelect = (amount: number) => {
    const list: NFTInfo[] = dataList.filter(
      (item: NFTInfo) => !checkedIds.includes(item.token.tokenId)
    );
    const addNumber = amount - checkedIds.length;

    let result = [];
    if (addNumber > 0) {
      result = [
        ...checkedIds,
        ...list.slice(0, addNumber).map((e) => e.token.tokenId),
      ];
    } else {
      result = checkedIds.slice(0, checkedIds.length + addNumber);
    }

    setCheckedIds(result);
  };

  const handleKeywordsFilter = (keywords: string) => {
    const str = keywords.trim();
    if (!str.length) {
      return setKeywords("");
    }
    setKeywords(str);
  };

  const filteredList = useMemo(
    () =>
      (keywords.length
        ? dataList.filter((e) => e.token.tokenId.indexOf(keywords) === 0)
        : dataList
      ).map((item) => ({
        ...item,
        key: item.token.tokenId,
      })),
    [dataList, keywords]
  );

  return (
    <main className=" min-h-screen lg:p-24 ">
      <InputCollectionAddress className="mb-4" handleList={setDataList} />

      <div className="bg-[#191A1F] p-10 text-color1">
        {/* header */}
        <div className="flex font-quantico text-white mb-8 gap-4">
          <div className="flex-1">{`NFT${
            dataList.length ? "(" + dataList.length + ")" : ""
          }`}</div>
          <Button type="primary">Claim Received</Button>
          {!address ? (
            <Button onClick={() => open()}>Connext Wallet</Button>
          ) : (
            <Button type="primary" title={address} onClick={() => disconnect()}>
              {shortenAddress(address)}
            </Button>
          )}
        </div>
        {/* toobar */}
        <div className="mb-8 gap-5 justify-between lg:flex">
          <MultiSelector checkedIds={checkedIds} onChange={batchSelect} />
          <div className="flex mt-4  gap-5 lg:mt-0 lg:justify-end">
            <SearchId
              onChange={(keywords) => handleKeywordsFilter(keywords)}
              className="flex-1 lg:max-w-45"
            />
            <SwitchListType type={listType} onChange={setlistType} />
          </div>
        </div>
        {/* list */}
        {!filteredList.length ? (
          "No Data!"
        ) : listType === 2 ? (
          <NFTCardList
            dataList={filteredList}
            checkedIds={checkedIds}
            updateCheckedIds={setCheckedIds}
          />
        ) : (
          <NFTTableList
            dataList={filteredList}
            checkedIds={checkedIds}
            updateCheckedIds={setCheckedIds}
          />
        )}
      </div>
    </main>
  );
}
