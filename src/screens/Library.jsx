import React, { useState, useEffect } from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button"

import { getData } from "../services/Services";

const Library = (props) => {
    const [data, setData] = useState(null)
    const [type, setType] = useState("labs")
    const [buttonText, setButtonText] = useState('company')

    useEffect(() => {
        getData(type).then(data => {
            setData(data)
        })
        type === 'labs' ? setButtonText('company') : setButtonText('user')
    }, [type, buttonText])


    if (data)
        return <>
            <Button
                size="large"
                variant="primary"
                onClick={() => { type === "candidates" ? setType("labs") : setType("candidates") }}
            >
                {`Switch to: ${buttonText}`}
            </Button>

            {data.map((item) => (
                <div
                    key={item.id}
                    onClick={() => props.history.push({ pathname: `/profile/${item.id}`, dataType: type })}
                >
                    <Card
                        outline
                        name={item.name}
                        imgUrl={item.profile_image}
                        technologies={item.technologies}
                    ></Card>
                </div>
            ))}
        </>
    return <Loader />
};

export default Library;
