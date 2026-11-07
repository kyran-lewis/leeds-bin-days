import dayjs from "dayjs";
import Binny from "./assets/Binny.jpeg";
import BlackBin from "./assets/black-bin.jpeg";
import GreenBin from "./assets/green-bin.jpeg";
import BlueBin from "./assets/blue-bin.jpeg";
import "./styles/home-page.css";
import TakenOutModal from "./TakenOutModal";
import CollectedModal from "./CollectedModal";

function HomePage() {
  const name = "Kyran";
  const address = "14 Nunthorpe Road, LS13 1JS";

  const bins = [
    {
      date: "Today",
      colour: "Black",
      description: "General Waste",
      image: BlackBin,
    },
    {
      date: dayjs().add(1, "week").format("dddd, D MMM YYYY"),
      colour: "Green",
      description: "Recycling",
      image: GreenBin,
    },
    {
      date: dayjs().add(2, "week").format("dddd, D MMM YYYY"),
      colour: "Blue",
      description: "Garden Waste",
      image: BlueBin,
    },
  ];

  return (
    <main>
      <TakenOutModal />
      <CollectedModal />
      <h1>Welcome Back {name}!</h1>
      <img width={600} src={Binny} />

      <h2>Your Address: {address}</h2>
      <h2>
        Next Collection:{" "}
        <b
          className={`next-collection ${bins[0].date === "Today" ? "today" : bins[0].date === "Tomorrow" ? "tomorrow" : ""}`}
        >
          {bins[0].date}
        </b>
      </h2>

      {bins.map((bin) => (
        <section className="day-sections">
          <h3>{bin.date}</h3>
          <img src={bin.image} width="60" />
          <h4>{bin.colour} Bin</h4>
          <p>{bin.description}</p>
        </section>
      ))}
    </main>
  );
}

export default HomePage;
