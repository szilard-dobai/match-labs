import React, { useState, useEffect } from "react";

import Card from "../components/Card";
import styles from "./Profile.module.css"
import Tags from "../components/Tags";
import Loader from "../components/Loader"

import { getDataById } from "../services/Services"

const Profile = (props) => {
  const [data, setData] = useState([])

  useEffect(() => {
    props.location.dataType === "labs" ?
      getDataById("labs", props.match.params.id).then(res => {
        setData(
          <>
            <div className={styles.profile}>
              <div className={styles.hero}>
                <Card imgUrl={res.company.profile_image}></Card>
              </div>

              <div className={styles.rightSide}>
                <h3 className={styles.name}>{res.name}</h3>

                <section className={styles.skills}>
                  <p className={styles.tagsTitle}>Technologies</p>
                  {res.technologies && <Tags tags={res.technologies}></Tags>}
                </section>

                <section className={styles.objectives}>
                  <h4 className={styles.heading}>Objectives</h4>
                  <p>{res.objectives}</p>
                </section>

                <section className={styles.description}>
                  <h4 className={styles.heading}>About</h4>
                  {res.company.description}
                </section>
              </div>
            </div>
          </>)
      })
      :
      setData(<span>{"This is a candidate."}</span>)
  }, [props.match])

  if (data)
    return data
  return <Loader />
};

export default Profile;
