import { useEffect, useState } from "react";

export default function VillageHead({ village }) {
  return (
        <div>
            <img src={village.image} alt={"img"} />
        </div>
  );
}
