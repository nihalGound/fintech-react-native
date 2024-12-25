import { View, Text } from "react-native";
import React from "react";
import { MARGIN } from "./Config";
import List from "./SortableList";
import Tile from "./Tile";

const tiles = [
  {
    id: "spent",
  },
  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
];

const WidgetList = () => {
  return (
    <View
      style={{
        paddingHorizontal: MARGIN,
        marginBottom: 80,
      }}
    >
      <List
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile onLongPress={() => true} key={tile.id + '-' + index} id={tile.id} />
        ))}
      </List>
    </View>
  );
};

export default WidgetList;
