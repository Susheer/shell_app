import React from "react";
import ItemHeader from "./item-header";
import IBody from "./item-body";
import IFooter from "./item-footer";
const Item = ({
  title,
  matchStatus,
  matchStatusColor,
  flagAColor,
  flagBColor,
  teamA,
  teamB,
  flagA,
  flagB,
  time,
  onPress,
  matchId
}) => {
  let className = "card card_iteam darkTheme";

  return (
    <div data-key={matchId}>
      <li className={className} onClick={onPress} data-key={matchId}>
        <ItemHeader
          title={title}
          matchStatus={matchStatus}
          statusColor={matchStatusColor}
        />
        <IBody
          leftFlagColor={flagAColor}
          rightFlagColor={flagBColor}
          leftContryTitle={teamA}
          rightContryTitle={teamB}
          flagA={flagA}
          flagB={flagB}
          time={time}
        />
        <IFooter />
      </li>
    </div>
  );
};

export default Item;
