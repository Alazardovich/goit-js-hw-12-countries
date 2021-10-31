
    function fetchCountries(searchQuery) {
        fetch(`https://restcountries.com/v2/name/ukraine`)
        .then(responce => responce.json()
        .then(console.log));
    }

    export default { fetchCountries };
