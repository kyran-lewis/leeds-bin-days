import Tick from "./assets/tick.png";
import Cross from "./assets/cross.png";
import Clock from "./assets/clock.png";

function TakenOutModal() {
  return (
    <div className="modal">
      {/* close button */}
      <h3>Have you taken out your bins today?</h3>
      <button>
        <img src={Tick} />
        Yes, I have.
      </button>
      <button>
        <img src={Cross} />
        No, I haven't.
      </button>
      <button>
        <img src={Clock} />
        Remind me later
      </button>
    </div>
  );
}

export default TakenOutModal;
