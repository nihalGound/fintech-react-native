import * as DM from "zeego/dropdown-menu";
import RoundBtn from "./RoundBtn";

const Dropdown = () => {
  return (
    <DM.Root>
      <DM.Trigger>
        <RoundBtn icon={"ellipsis-horizontal"} text="More" />
      </DM.Trigger>
      <DM.Content>
        <DM.Item key="statement">
          <DM.ItemTitle>Statement</DM.ItemTitle>
          <DM.ItemIcon
            ios={{
              name: "list.bullet.rectangle.fill",
              pointSize: 24,
            }}
            androidIconName="receipt"
          >
          </DM.ItemIcon>
        </DM.Item>
        <DM.Item key="convertor">
          <DM.ItemTitle>Convertor</DM.ItemTitle>
          <DM.ItemIcon
            ios={{ name: "coloncurrencysign.arrow.circlepath", pointSize: 24 }}
            androidIconName="currency_exchange"
          ></DM.ItemIcon>
        </DM.Item>
        <DM.Item key="background">
          <DM.ItemTitle>Background</DM.ItemTitle>
          <DM.ItemIcon
            ios={{
              name: "photo.fill",
              pointSize: 24,
            }}
            androidIconName="image"
          ></DM.ItemIcon>
        </DM.Item>

        <DM.Item key="account">
          <DM.ItemTitle>Add new account</DM.ItemTitle>
          <DM.ItemIcon
            ios={{
              name: "plus.rectangle.on.folder.fill",
              pointSize: 24,
            }}
            androidIconName="add_to_photos"
          ></DM.ItemIcon>
        </DM.Item>
      </DM.Content>
    </DM.Root>
  );
};

export default Dropdown;
