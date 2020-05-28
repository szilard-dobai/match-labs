import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import Tags from "../components/Tags";
import Card from "../components/Card";
import { fetchProfile, fetchLikes, like, dislike } from "../utils/request";
import Loader from "../components/Loader";
import GoBack from "../components/GoBack";

const Profile = (props) => {
  const [profile, setProfile] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    const onMount = async () => {
      const id = props.match.params.id;
      const profile = await fetchProfile(id);
      // 1. fetchLikes and setLikes
      const likes = await fetchLikes();

      setLikes(likes);
      setProfile(profile);
    };
    onMount();
  }, [props.match.params.id]);

  useEffect(() => {

  }, [likes]);

  const removeLike = () => {
    // 5. Find like index and splice it from state
    const profileIndex = likes.findIndex(lab => lab.id === profile.id)
    likes.splice(profileIndex,1)
    setLikes(likes)
  };

  const onButtonClick = async (direction) => {
    // 4. removeLike from state
    removeLike();

    // 6. likeOrDislike
    const liked =
      direction === "right"
        ? await like(profile.id)
        : await dislike(profile.id);
  };

  const _renderButtons = () => {
    return (
      <div className={styles.buttons}>
        <div className={styles.button} onClick={() => onButtonClick("left")}>
          <img src={require("../static/svg/close.svg")} alt={"close"} />
        </div>
        <div className={styles.button} onClick={() => onButtonClick("right")}>
          <img src={require("../static/svg/heart.svg")} alt={"heart"} />
        </div>
      </div>
    );
  };

  const isLikeable = () => {
    // 3. likes.some
    if (likes && profile)
      return likes.some(lab => lab.id === profile.id)
  };


  if (likes && profile)
    return (
      <>
        <div className={styles.profile}>
          <GoBack />
          <div className={styles.hero}>
            <Card imgUrl={profile.profile_image}></Card>
            {/* 2. If likeable render buttons */}
            {isLikeable() && _renderButtons()}
          </div>
          <div className={styles.rightSide}>
            <h3 className={styles.name}>{profile.name}</h3>

            <section className={styles.skills}>
              <p className={styles.tagsTitle}>Technologies</p>
              {profile.technologies && <Tags tags={profile.technologies}></Tags>}
            </section>

            <section className={styles.objectives}>
              <h4 className={styles.heading}>Objectives</h4>
              <p>{profile.objectives}</p>
            </section>

            <section className={styles.description}>
              <h4 className={styles.heading}>About</h4>

              <p>{profile.description}</p>
            </section>
          </div>
        </div>
      </>
    );

  return (<Loader></Loader>)
};

export default Profile;
