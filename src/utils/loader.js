import { useState } from "react";
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading row justify-content-center align-items-center" style={{height:'100%'}}>
      <ClockLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Loader;