const getData = async (type) => {
    // const urlLabs = "https://match-labs-api.herokuapp.com/api/no_auth/labs";
    // const urlCandidates = "https://match-labs-api.herokuapp.com/api/no_auth/candidates";
    const url = type === "labs" ? "https://match-labs-api.herokuapp.com/api/no_auth/labs" 
                                : type === "candidates" ? "https://match-labs-api.herokuapp.com/api/no_auth/candidates"
                                                        : "";
    const data = await fetch(url);
    const json = await data.json();
    return json;
}

const getDataById = async (type, id) => {
    const url = type === "labs" ? `https://match-labs-api.herokuapp.com/api/no_auth/labs/${id}`
                                : type === "candidates" ? `https://match-labs-api.herokuapp.com/api/no_auth/candidates/${id}`
                                                        : "";
    const data = await fetch(url);
    const json = await data.json();
    return json;
}



export { getData, getDataById };