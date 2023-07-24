import {React, useState } from 'react'
import axios from "axios";
import Navbar from '../../components/navbar';


// Function to format the JSON response
function formatJsonResponse(response) {
  const formattedResponse = {
    word: response.word,
    syllables: {
      count: response.syllables.count,
      list: response.syllables.list.join("-"),
    },
    pronunciation: response.pronunciation,
    definition: [],
    partOfSpeech: [],
    synonyms: [],
    similarTo: [],
    examples: [],
    derivation: [],
  };

  const uniquePartOfSpeech = new Set();

  response.results.forEach((result) => {
    formattedResponse.definition.push(result.definition);
    formattedResponse.synonyms.push(...result.synonyms);
    formattedResponse.similarTo.push(...result.similarTo);
    formattedResponse.examples.push(...result.examples);

    if (result.derivation && Array.isArray(result.derivation)) {
      formattedResponse.derivation.push(...result.derivation);
    }

    uniquePartOfSpeech.add(result.partOfSpeech);
  });

  if (uniquePartOfSpeech.size === 1) {
    formattedResponse.partOfSpeech.push(...uniquePartOfSpeech);
  } else {
    formattedResponse.partOfSpeech = Array.from(uniquePartOfSpeech);
  }

  return formattedResponse;
}

function Layout() {

  const [searchWord, setSearchWord] = useState("");
  const [jsonResponse, setJsonResponse] = useState({});
  const urlWithProxy = "/search";

    function getDataFromServer(srchWord) {
    setSearchWord(srchWord);
    axios
      .get(urlWithProxy, {
        params: { searchWord: srchWord },
      })
      .then((res) => {
        const formattedResponse = formatJsonResponse(res.data);
        setJsonResponse(formattedResponse);
        console.log(formattedResponse); // Logging the formatted response
      })
      .catch((err) => {
        setJsonResponse(err);
        console.error(err);
      });
    }

  return (
    <>
      <Navbar getData={getDataFromServer} />
      <br />
      {/* <Container>
        <p>data: {jsonResponse.syllables?.list}</p>
      </Container> */}
    </>
  );
}

export default Layout
