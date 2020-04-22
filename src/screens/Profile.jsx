import React, { useState, useEffect } from "react";

import Card from "../components/Card";
import styles from "./Profile.module.css"
import Tags from "../components/Tags";
import Loader from "../components/Loader"

import { getDataById } from "../services/Services"

const Profile = (props) => {
  const [data, setData] = useState([])
  const type = props.location.dataType

  useEffect(() => {
      getDataById(type, props.match.params.id).then(res => {setData(res)})
  }, [props.match])
  
  if (data)
    return <>
      <div className={styles.profile}>
        <div className={styles.hero}>
          <Card imgUrl={data.profile_image}/>
        </div>

        <div className={styles.rightSide}>
          <h3 className={styles.name}>{data.name}</h3>

          <section className={styles.skills}>
            <p className={styles.tagsTitle}>Technologies</p>
            {data.technologies && <Tags tags={data.technologies}/>}
          </section>

          {data.objectives && <section className={styles.objectives}>
            <h4 className={styles.heading}>Objectives</h4>
            <p>{data.objectives}</p>
          </section>}

          <section className={styles.description}>
            <h4 className={styles.heading}>About</h4>
            {data.description}
          </section>
        </div>
      </div>
    </>
  return <Loader />
};

export default Profile;
