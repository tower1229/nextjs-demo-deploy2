import { NFTInfo } from "../constant/type";
import Image from "next/image";
import { Popover, Checkbox } from "antd";
import { shortenAddress } from "../utils/common";

const getContent = (item: NFTInfo) => {
  const attrCellClass =
    "bg-bg2 text-color2 text-xs rounded-xs px-2 py-1 truncate";

  return (
    <div className="rounded-sm overflow-hidden lg:flex">
      <Image
        className="rounded-lg mr-5"
        src={item.token.imageLarge}
        alt={item.token.name}
        width={230}
        height={230}
      />
      <div className="max-w-max w-96">
        <div className="text-xs mb-2 text-color2 leading-6">
          Current price
          <div className="text-base text-color1">
            {`${item.market.floorAsk.price.amount.native} ${item.market.floorAsk.price.currency.symbol}`}
          </div>
        </div>
        <div className="text-color1">
          <div className="py-1">Traits</div>
          <div className="grid gap-2 grid-cols-3">
            <div className={attrCellClass}>
              Kind
              <div className="text-color1 truncate" title={item.token.kind}>
                {item.token.kind}
              </div>
            </div>
            <div className={attrCellClass}>
              rarityRank
              <div
                className="text-color1 truncate"
                title={String(item.token.rarityRank)}
              >
                {item.token.rarityRank}
              </div>
            </div>
            <div className={attrCellClass}>
              Description
              <div
                className="text-color1 truncate"
                title={item.token.description}
              >
                {item.token.description}
              </div>
            </div>
            <div className={attrCellClass}>
              Owner
              <div className="text-color1 truncate" title={item.token.owner}>
                {shortenAddress(item.token.owner)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NFTCard({
  item,
  checked,
  onChangeCheck,
}: {
  item: NFTInfo;
  checked?: boolean;
  onChangeCheck?: (value: boolean) => any;
}) {
  return (
    <div className="rounded-sm bg-bg2 overflow-hidden">
      <div className="bg-bg3 aspect-square relative">
        <Image
          src={item.token.imageSmall}
          alt={item.token.name}
          layout="fill"
        />
        <Image
          className="top-2 left-2 absolute"
          src="/assets/nft_icon.png"
          alt="nft_icon"
          width={16}
          height={16}
        />
        <Popover content={getContent(item)} placement="bottom">
          <Image
            className="cursor-pointer top-2 left-8 absolute"
            src="/assets/info.png"
            alt="nft_icon"
            width={16}
            height={16}
          />
        </Popover>
        <Checkbox
          className="rounded bg-bg3 p-1 top-2 right-2 text-[0] absolute"
          checked={checked}
          onChange={(e) => onChangeCheck?.(e.target.checked)}
        ></Checkbox>
      </div>
      <div className="p-2">
        <div className="text-sm mb-1 truncate">{item.token.name}</div>
        <div className="text-xs text-color2 truncate">
          {item.token.description}
        </div>
      </div>
    </div>
  );
}
