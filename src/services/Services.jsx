const matchLabsHost = "https://match-labs-api.herokuapp.com/api/no_auth"

const getData = async (type) => {
    const url = `${matchLabsHost}/${type}`
    const rawData = await fetch(url);
    const json = await rawData.json();

    const data = json.map(item => {
        const d = {}
        d.id = item.id
        d.name = type === 'labs' ? item.name : `${item.first_name} ${item.last_name}`
        d.technologies = item.technologies
        d.profile_image = type === 'labs' ? item.company.profile_image : item.profile_image
        return d
    })

    return data;
}

const getDataById = async (type, id) => {
    const url = `${matchLabsHost}/${type}/${id}`
    const rawData = await fetch(url);
    const json = await rawData.json();
    console.log(json)
    const data = {}
    data.id = json.id
    data.name = type === 'labs' ? json.name : `${json.first_name} ${json.last_name}`
    data.technologies = json.technologies
    data.profile_image = type === 'labs' ? json.company.profile_image : json.profile_image
    data.objectives = type === 'labs' ? json.objectives : null
    data.description = type === 'labs' ? json.company.description : json.description

    return data;
}

export { getData, getDataById };
