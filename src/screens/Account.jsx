import React, { useContext, useEffect, useState } from "react";

import CandidateForm from "../components/CandidateForm";
import PageTitle from "../components/PageTitle";
import { AppContext } from "../Context";
import Loader from "../components/Loader";
import { editAccount } from "../utils/request";

const Account = () => {
  const { user } = useContext(AppContext);
  const [fields, setFields] = useState(null);

  useEffect(() => {
    console.log(user)
    const newFields = Object.keys(user.personal).map((key) => {
      if (key !== 'technologies')
        return ({
          name: key,
          value: user.personal[key],
        })
      else
        return ({
          name: key,
          value: user.personal[key].map(item => { return ({ value: item.id, label: item.name })})
        })
    })
    setFields(newFields);
  }, [user]);

  const onFormSubmit = async (values) => {
    const { technologies, ...rest } = values;
    await editAccount(user.id, { [user.role]: rest, technologies: technologies.map(item => item.value) });
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
