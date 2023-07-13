import { UnorderedListOutlined, AppstoreAddOutlined } from "@ant-design/icons";

const iconClass =
  "cursor-pointer w-8 h-8 text-center box-border pt-2 bg-bg2 inline-block align-top hover:bg-primary hover:text-color1 text-base first:rounded-l-sm last:rounded-r-sm";

export default function SwitchListType(props: {
  type: 1 | 2;
  onChange?: (type: 1 | 2) => any;
}) {
  return (
    <div>
      <AppstoreAddOutlined
        className={
          iconClass + (props.type === 1 ? " bg-primary text-color1" : "")
        }
        onClick={() => props.onChange?.(1)}
      />
      <UnorderedListOutlined
        className={
          iconClass + (props.type === 2 ? " bg-primary text-color1" : "")
        }
        onClick={() => props.onChange?.(2)}
      />
    </div>
  );
}
