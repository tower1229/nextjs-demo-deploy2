import { NFTInfo } from "../constant/type";
import { Table, Image } from "antd";
import type { ColumnsType } from "antd/es/table";
import { shortenAddress } from "../utils/common";

const columns: ColumnsType<NFTInfo> = [
  {
    title: "NFT",
    dataIndex: ["token", "name"],
    key: "NFT",
  },
  {
    title: "Image",
    dataIndex: "Image",
    key: "Image",
    render: (_, { token }) => (
      <>
        <Image width={80} src={token.imageLarge} alt={token.name} />
      </>
    ),
  },
  {
    title: "Current Price",
    key: "Current Price",
    width: 150,
    render: (_, { market }) => (
      <>{`${market.floorAsk.price.amount.native} ${market.floorAsk.price.currency.symbol}`}</>
    ),
  },
  {
    title: "Kind",
    dataIndex: ["token", "kind"],
    key: "Kind",
  },
  {
    title: "rarityRank",
    dataIndex: ["token", "rarityRank"],
    key: "address",
  },
  {
    title: "Description",
    dataIndex: ["token", "description"],
    key: "address",
  },
  {
    title: "Owner",
    dataIndex: ["token", "owner"],
    key: "address",
    render: (_, { token }) => <>{shortenAddress(token.owner)}</>,
  },
];

export default function NFTTableList({
  dataList,
  checkedIds,
  updateCheckedIds,
}: {
  dataList: NFTInfo[];
  checkedIds?: string[];
  updateCheckedIds?: (ids: string[]) => any;
}) {
  const onSelectChange = (record: NFTInfo, selected: boolean) => {
    console.log(record, selected);
    if (selected) {
      updateCheckedIds?.([...(checkedIds || []), record.token.tokenId]);
    } else {
      updateCheckedIds?.(
        (checkedIds || []).filter((str) => str !== record.token.tokenId)
      );
    }
  };

  const rowSelection = {
    selectedRowKeys: checkedIds,
    onSelect: onSelectChange,
  };

  return (
    <Table
      rowSelection={rowSelection}
      dataSource={dataList}
      columns={columns}
      scroll={{
        x: 640,
      }}
    />
  );
}
