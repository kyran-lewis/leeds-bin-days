import axios from "axios";
import { useState } from "react";

function PostcodePage() {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function capitaliseFirstLetter(string) {
    let newString = "";

    if (!string.includes(" ")) {
      return string[0].toUpperCase() + string.slice(1);
    }

    for (const word of string.split(" ")) {
      newString += word[0].toUpperCase() + word.slice(1) + " ";
    }

    return newString;
  }

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

  return addresses.length <= 0 ? (
    <>
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
    </>
  ) : (
    <>
      <h1>Addresses:</h1>
      {addresses.map((address) => (
        <div>
          <p key={address.uprn}>
            {address.houseNumber} {capitaliseFirstLetter(address.street)}{" "}
            {capitaliseFirstLetter(address.city)},
            {capitaliseFirstLetter(address.county)}, {postcode}
          </p>
        </div>
      ))}
    </>
  );
}

export default PostcodePage;
