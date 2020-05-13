import React, { useState, useEffect } from "react";

import styles from "./CandidateForm.module.css";
import Button from "./Button";
import Loader from "./Loader";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { fetchTechnologies } from "../utils/request";

const animatedComponents = makeAnimated();

const CandidateForm = ({ fields, onSubmit }) => {
  const [values, setValues] = useState(fields);
  const [tech, setTech] = useState(null)

  useEffect(() => {
    const onMount = async () => {
      const data = await fetchTechnologies()
      setTech(data.map((item) => {
        return ({ value: item.id, label: item.name })
      }))
    }
    onMount()
  }, []);

  const onChange = (e) => {
    const newValues = [...values];
    const index = newValues.findIndex((value) => value.name === e.target.name);
    newValues[index] = { ...newValues[index], value: e.target.value };
    setValues(newValues);
  };

  const onSelectChange = (selected) => {
    const newValues = [...values];
    const index=newValues.findIndex(value => value.name === 'technologies')
    newValues[index] = { name: 'technologies', value: selected}
    setValues(newValues)
  };

  const formHandler = (e) => {
    e.preventDefault();
    const obj = {};
    values.forEach((item) => {
      obj[item.name] = item.value;
    });

    onSubmit(obj);
  };

  if (!values) return <Loader></Loader>;

  return (
    <>
      <form onSubmit={formHandler} className={styles.form}>
        {values.map((field) => {
          if (field.name !== "technologies")
            return (
              <div key={field.name} className={styles.field}>
                <input
                  required
                  onChange={onChange}
                  value={field.value}
                  placeholder={field.placeholder || ""}
                  name={field.name}
                ></input>
              </div>
            )
          else
            return (
              <div key={field.name} className={styles.field}>
                <Select options={tech} defaultValue={field.value} onChange={onSelectChange} isMulti closeMenuOnSelect={false} components={animatedComponents} />
              </div>
            )
        })}
        <Button type={"submit"} variant={"secondary"} size={"medium"}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default CandidateForm;
