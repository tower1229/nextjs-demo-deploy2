import { NFTInfo } from "../constant/type";
import NFTCard from "../components/NFTCard";

export default function NFTCardList({
  dataList,
  checkedIds,
  updateCheckedIds,
}: {
  dataList: NFTInfo[];
  checkedIds?: string[];
  updateCheckedIds?: (ids: string[]) => any;
}) {
  const handleCheck = (value: boolean, tokenId: string) => {
    if (value) {
      updateCheckedIds?.([...(checkedIds || []), tokenId]);
    } else {
      updateCheckedIds?.((checkedIds || []).filter((str) => str !== tokenId));
    }
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
      {dataList.map((item) => (
        <NFTCard
          key={item.token?.tokenId}
          item={item}
          checked={checkedIds?.includes(item.token.tokenId)}
          onChangeCheck={(value) => handleCheck(value, item.token.tokenId)}
        />
      ))}
    </div>
  );
}
