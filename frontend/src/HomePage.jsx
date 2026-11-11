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
import { capitaliseFirstLetter } from "./utils";

function HomePage() {
  // const name = "Kyran";
  const fullAddress = sessionStorage.getItem("fullAddress");
  const postcode = sessionStorage.getItem("postcode");
  const houseNumber = sessionStorage.getItem("houseNumber");
  const uprn = sessionStorage.getItem("uprn");
  const [lastUpdated, setLastUpdated] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

      setBinDays(data.bins);
      setLastUpdated(dayjs(data.retrievedAt).format("dddd, D MMM YYYY"));
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        setErrorMessage("No bins found for this address");
      } else {
        setErrorMessage("Something went wrong :(");
      }
      // setBinDays([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getBinDays();
  }, []);

  console.log(binDays);

  const getDayClassName = (date) => {
    if (
      dayjs(binDays[0].date).format("DD/MM/YYYY") ==
      dayjs().format("DD/MM/YYYY")
    )
      return "today";
    else if (
      dayjs(binDays[0].date).format("DD/MM/YYYY") ==
      dayjs().add(1, "day").format("DD/MM/YYYY")
    ) {
      return "tomorrow";
    } else {
      return "";
    }
  };

  const getDayLabel = (date) => {
    if (
      dayjs(binDays[0].date).format("DD/MM/YYYY") ==
      dayjs().format("DD/MM/YYYY")
    )
      return "Today";
    else if (
      dayjs(binDays[0].date).format("DD/MM/YYYY") ==
      dayjs().add(1, "day").format("DD/MM/YYYY")
    ) {
      return "Tomorrow";
    } else {
      return dayjs(date).format("dddd, D MMM YYYY");
    }
  };

  return (
    <>
      <main>
        {/* <TakenOutModal />
        <CollectedModal /> */}
        <h1>Welcome Back {name}!</h1>
        <img width={600} src={Binny} />

        <h2>Your Address: {fullAddress}</h2>
        <h2>
          Next Collection:{" "}
          {loading ? (
            <b>...</b>
          ) : (
            <b
              className={`next-collection ${getDayClassName(binDays[0].date)}`}
            >
              {getDayLabel(binDays[0].date)}
            </b>
          )}
        </h2>
        {loading ? (
          <h2>Loading...</h2>
        ) : binDays.length <= 0 ? (
          <h2>{errorMessage}</h2>
        ) : (
          <div className="cards">
            {binDays.map((bin) => (
              <section className="day-card">
                <h3>{dayjs(bin.date).format("dddd, D MMM YYYY")}</h3>
                <img src={binImages[bin.type]} width="60" />
                <h4>{bin.type} Bin</h4>
                <p>{bin.description}</p>
              </section>
            ))}
          </div>
        )}
      </main>
      <footer>
        <p>Last updated: {loading ? "..." : lastUpdated}</p>
      </footer>
    </>
  );
}

export default HomePage;
