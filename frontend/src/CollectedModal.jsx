import Tick from "./assets/tick.png";
import Cross from "./assets/cross.png";
import Dash from "./assets/dash.png";

function CollectedModal() {
  return (
    <div className="modal">
      {/* close button */}
      <h3>Did your bins get collected?</h3>
      <button>
        <img src={Tick} />
        <div className="text">
          <span>Yes.</span>{" "}
          <span className="small">The bins were emptied.</span>
        </div>
      </button>
      <button>
        <img src={Cross} />
        <div className="text">
          <span>No.</span>{" "}
          <span className="small">My bins were out but weren't emptied.</span>
        </div>{" "}
      </button>
      <button>
        <img src={Dash} />
        <div className="text">
          <span>Didn't take out.</span>{" "}
          <span className="small">
            Don't count this as a missed collection.
          </span>
        </div>
      </button>
    </div>
  );
}

export default CollectedModal;
