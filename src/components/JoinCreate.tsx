import React from "react";
import Logo from "./Logo";

const JoinCreate: React.FC = () => {
  return (
    <div className="App">
      <Logo />
      Siin on joinimis aken ja mängu loomise aken
      <table>
        <td>
          <button> Loo mäng </button>
        </td>
        <td>
          <button> Liitu mänguga </button>
        </td>
      </table>
    </div>
  );
};

export default JoinCreate;
