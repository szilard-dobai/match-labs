import React, { useState, useEffect } from "react";

import Card from "../components/Card";
import Loader from "../components/Loader";
import Button from "../components/Button"

import { getData } from "../services/Services";

const Library = (props) => {
    const [cardComponent, setCardComponent] = useState(null)
    const [user, setUser] = useState("candidate")

    useEffect(() => {
        const type = user === "company" ? "candidates" : "labs";
        getData(type).then(data => {
            setCardComponent(
                <>
                    <Button
                        size="large"
                        variant="primary"
                        onClick={() => { user === "company" ? setUser("candidate") : setUser("company") }}
                    >
                        {"Switch to: " + user}
                    </Button>

                    {data.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => props.history.push({ pathname: `/profile/${item.id}`, dataType: type })}
                        >
                            <Card
                                outline
                                name={item.name}
                                imgUrl={type === "labs" ? item.company.profile_image : item.profile_image}
                                technologies={item.technologies}
                            ></Card>
                        </div>
                    ))}
                </>
            )
        })
    }, [props.history, user])


    if (cardComponent)
        return cardComponent;
    return <Loader />
};

export default Library;
