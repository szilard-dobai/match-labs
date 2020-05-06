import React, { useEffect, useState, useContext } from "react";

import CandidateForm from "../components/CandidateForm";
import PageTitle from "../components/PageTitle";
import Loader from "../components/Loader";
import { AppContext } from "../Context"
import { editCandidate } from "../utils/request"

const Account = () => {
  const [fields, setFields] = useState(null);
  const { user, setUser } = useContext(AppContext)

  useEffect(() => {
    setFields(Object.keys(user.personal).map(item => {return {name: item, value: user.personal[item]}}))
  }, []);

  const onFormSubmit = async (values) => {
    const hasChanged = await editCandidate(values, user.id)
    hasChanged && setUser({...user, personal: values})
  };

  if (!fields) return <Loader />;

  return (
    <>
      <PageTitle>
        <h3>Edit account</h3>
      </PageTitle>
      <CandidateForm onSubmit={onFormSubmit} fields={fields}></CandidateForm>
    </>
  );
};

export default Account;
