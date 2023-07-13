"use client";
import { Slider, Input } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

export default function MultiSelector(props: {
  checkedIds?: string[];
  onChange?: (value: number) => any;
}) {
  const [number, setNumber] = useState<number>(props.checkedIds?.length || 0);

  useEffect(() => {
    setNumber(props.checkedIds?.length || 0);
  }, [props.checkedIds]);

  return (
    <div className="rounded-sm flex bg-bg2 px-2 gap-2 items-center">
      <ClearOutlined className="text-xl text-color2" />
      <Input
        value={number}
        className="w-12"
        size="small"
        onChange={(e) => {
          let value = Number(e.target.value);
          if (isNaN(value)) {
            value = 0;
          }
          if (value > 30) {
            value = 30;
          }
          if (30 < 0) {
            value = 0;
          }
          setNumber(value);
          props.onChange?.(value);
        }}
      />
      <Slider
        value={number}
        min={0}
        max={30}
        className="w-40"
        onChange={(value) => {
          setNumber(value);
          props.onChange?.(value);
        }}
      />
    </div>
  );
}
