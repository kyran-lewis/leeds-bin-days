import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitaliseFirstLetter } from "./utils";
import "./styles/selector.css";

function PostcodePage() {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // function capitaliseFirstLetter(string) {
  //   let newString = "";

  //   if (!string.includes(" ")) {
  //     return string[0].toUpperCase() + string.slice(1);
  //   }

  //   for (const word of string.split(" ")) {
  //     newString += word[0].toUpperCase() + word.slice(1) + " ";
  //   }

  //   return newString.substring(0, newString.length - 1);
  // }

  const getAddresses = async (e) => {
    e.preventDefault();

    if (postcode.length <= 0) {
      setErrorMessage("Please enter a valid postcode");
      return;
    }

    // TODO: add postcode regex validation

    const normalisedPostcode = postcode.toLowerCase().replace(" ", "");

    try {
      const { data } = await axios.get(
        "http://localhost:3000/addresses?postcode=" + normalisedPostcode,
      );

      setAddresses(data);
    } catch (error) {
      console.log("hi");
      console.log(error.status);
      setPostcode(postcode);
      if (error.status === 400) {
        setErrorMessage("Please enter a valid postcode");
        return;
      } else if (error.status === 404) {
        setErrorMessage("Postcode not found");
        return;
      } else {
        setErrorMessage("Something went wrong");
        return;
      }
    }
  };

  const formatPostcode = (postcode) => {
    const normalisedPostcode = postcode.toUpperCase().replace(" ", "");

    return (
      normalisedPostcode.substring(0, normalisedPostcode.length - 3) +
      " " +
      normalisedPostcode.substring(normalisedPostcode.length - 3)
    );
  };

  const handleSelect = (address) => {
    const fullAddress =
      address.houseNumber +
      " " +
      capitaliseFirstLetter(address.street) +
      ", " +
      capitaliseFirstLetter(address.city) +
      ", " +
      capitaliseFirstLetter(address.county) +
      ", " +
      formatPostcode(postcode);

    sessionStorage.setItem("fullAddress", fullAddress);
    sessionStorage.setItem("postcode", formatPostcode(postcode));
    sessionStorage.setItem("houseNumber", address.houseNumber);
    sessionStorage.setItem("uprn", address.uprn);

    navigate("/home");
  };

  return (
    <main className="selector">
      {addresses.length <= 0 ? (
        <div className="postcode">
          <p>{errorMessage}</p>
          <form onSubmit={getAddresses}>
            <label htmlFor="postcode">Please enter your postcode:</label>
            <input
              name="postcode"
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Addresses:</h1>
          <div className="selector address-list">
            {addresses.map((address) => (
              <p key={address.uprn} onClick={(e) => handleSelect(address)}>
                {address.houseNumber} {capitaliseFirstLetter(address.street)},{" "}
                {capitaliseFirstLetter(address.city)},{" "}
                {capitaliseFirstLetter(address.county)},{" "}
                {formatPostcode(postcode)}
              </p>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default PostcodePage;
