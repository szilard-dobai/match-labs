const matchLabsHost = "https://match-labs-api.herokuapp.com/api/no_auth"

const getData = async (type) => {
    const url = `${matchLabsHost}/${type}`
    const rawData = await fetch(url);
    const json = await rawData.json();

    return json.map(item => {return {
        id: item.id,
        name: type === 'labs' ? item.name : `${item.first_name} ${item.last_name}`,
        technologies: item.technologies,
        profile_image: type === 'labs' ? item.company.profile_image : item.profile_image
    }})
}

const getDataById = async (type, id) => {
    const url = `${matchLabsHost}/${type}/${id}`
    const rawData = await fetch(url);
    const json = await rawData.json();

    return {
        id: json.id,
        name: type === 'labs' ? json.name : `${json.first_name} ${json.last_name}`,
        technologies: json.technologies,
        profile_image: type === 'labs' ? json.company.profile_image : json.profile_image,
        objectives: type === 'labs' ? json.objectives : null,
        description: type === 'labs' ? json.company.description : json.description
    }
}

export { getData, getDataById };
