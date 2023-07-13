"use client";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchId(props: {
  className?: string;
  onChange?: (keyword: string) => any;
}) {
  return (
    <div className={props.className}>
      <Input
        placeholder="Search ID"
        allowClear
        addonAfter={
          <SearchOutlined className="cursor-pointer hover:text-primary" />
        }
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </div>
  );
}
