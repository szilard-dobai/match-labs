import React, { useState } from "react";
import Card from "../components/Card";
import styles from "./ManageLab.module.css";
import Button from "../components/Button";
import { fetchLabs, createLab, deleteLab, editLab } from "../utils/request";
import { useEffect } from "react";
import CandidateForm from "../components/CandidateForm";
import Loader from "../components/Loader";
import { MANAGE_LAB_FIELDS } from "../mocks";

const ManageLab = () => {
  const [lab, setLab] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  // 5. create labFields
  const [labFields, setLabFields] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getLab();
  }, []);

  const getLab = async () => {
    const lab = await fetchLabs();
    setLab(lab);

    // 4. if lab setLabFields() for CandidateForm
    if (lab) {
      const fields = Object.keys(lab.personal).map((key) => ({
        name: key,
        value: lab.personal[key],
      }));
      setLabFields(fields)
    }
  };

  const deleteLabCall = async () => {
    const deleted = await deleteLab(lab.personal.id);
    console.log(deleted)
    await getLab();
  };

  const onFormSubmit = async (values) => {
    const { start_date, technologies, ...rest } = values;
    const labObj = {
      lab: rest,
      technologies,
    };

    // 6. if isEditing editLab || createLab
    if (isCreating && !isEditing) {
      await createLab(labObj);
      await getLab();
      setIsCreating(!isCreating)
    }

    if(isEditing && !isCreating) {
      await editLab(lab.personal.id, labObj);
      await getLab();
      setIsEditing(!isEditing)
    }
    // 7. if isEditing setIsEditing || setIsCreating
  };

  const _renderEditLab = () => {
    // 1. Render Card and buttons
    // 2. setIsEdiding(!isEditing)
    return (
      <>
        <Card
          outline
          imgUrl={lab?.company?.profile_image || ""}
          name={lab?.personal?.name || ""}
          technologies={lab?.personal.technologies.map((t) => ({
            id: t.value,
            name: t.label,
          }))}
        ></Card>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button action={() => setIsEditing(!isEditing)} variant={"primary"} size={"small"}>
              Edit lab
            </Button>
          </div>
          <div className={styles.button}>
            <Button action={() => deleteLabCall()} variant={"secondary"} size={"small"}>
              Delete lab
            </Button>
          </div>
        </div>
      </>
    );
  };

  const _renderCreateLab = () => {
    return (
      <>
        <Card outline imgUrl={require("../static/svg/logo.svg")}></Card>
        <div className={styles.button}>
          <Button
            action={() => setIsCreating(!isCreating)}
            variant={"secondary"}
            size={"small"}
          >
            Create lab
          </Button>
        </div>
      </>
    );
  };

  if (lab === null) return <Loader></Loader>;

  return (
    <div className={"box-wide"}>
      <div className={styles.manageLab}>
        {/* 3. if isEditing render candidateForm */}
        {/* create isEditing  */}

        {!lab && !isCreating && _renderCreateLab()}
        {!lab && isCreating && (
          <CandidateForm
            fields={MANAGE_LAB_FIELDS}
            onSubmit={onFormSubmit}
          ></CandidateForm>
        )}
        {lab && !isEditing && _renderEditLab()}
        {lab && isEditing && (
          <CandidateForm
            fields={labFields}
            onSubmit={onFormSubmit}
          ></CandidateForm>
        )}
      </div>
    </div>
  );
};

export default ManageLab;
