import dayjs from "dayjs";
import Binny from "./assets/Binny.jpeg";
import BlackBin from "./assets/black-bin.jpeg";
import GreenBin from "./assets/green-bin.jpeg";
import BlueBin from "./assets/blue-bin.jpeg";
import BrownBin from "./assets/brown-bin.jpeg";
import "./styles/home-page.css";
import TakenOutModal from "./TakenOutModal";
import CollectedModal from "./CollectedModal";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  // const name = "Kyran";
  const fullAddress = sessionStorage.getItem("fullAddress");
  const postcode = sessionStorage.getItem("postcode");
  const houseNumber = sessionStorage.getItem("houseNumber");
  const uprn = sessionStorage.getItem("uprn");

  const binImages = {
    Black: BlackBin,
    Green: GreenBin,
    Blue: BlueBin,
    Brown: BrownBin,
  };

  const [binDays, setBinDays] = useState([]);

  const getBinDays = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/bins?postcode=${postcode}&houseNumber=${houseNumber}&uprn=${uprn}`,
      );

      setBinDays(data);
    } catch (error) {
      console.log(error);
      // setBinDays([]);
    }
  };

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

  useEffect(() => {
    getBinDays();
  }, []);

  console.log(binDays);

  return (
    <main>
      {/* <TakenOutModal />
      <CollectedModal /> */}
      <h1>Welcome Back {name}!</h1>
      <img width={600} src={Binny} />

      <h2>Your Address: {fullAddress}</h2>
      <h2>
        Next Collection:{" "}
        <b
          className={`next-collection ${bins[0].date === "Today" ? "today" : bins[0].date === "Tomorrow" ? "tomorrow" : ""}`}
        >
          {bins[0].date}
        </b>
      </h2>

      {binDays.map((bin) => (
        <section className="day-sections">
          <h3>{dayjs(bin.date).format("dddd, D MMM YYYY")}</h3>
          <img src={binImages[bin.type]} width="60" />
          <h4>{bin.type} Bin</h4>
          <p>{bin.description}</p>
        </section>
      ))}
    </main>
  );
}

export default HomePage;
