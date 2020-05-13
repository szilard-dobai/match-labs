import React, { useState } from "react";
import CandidateForm from "../components/CandidateForm";
import { CREATE_CANDIDATE_FIELDS, CREATE_COMPANY_FIELDS } from "../mocks";
import PageTitle from "../components/PageTitle";
import { register, assignRole } from "../utils/request";
import Loader from "../components/Loader";
import Button from "../components/Button";

const Register = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [role, setRole] = useState(null)

  const onFormSubmit = async (values) => {
    setIsLoading(true);
    const { email, password, ...rest } = values;
    const user = await register({
      email,
      password,
    });

    if (user.id) assignUserRole(email, rest);
    setIsLoading(false);
  };

  const assignUserRole = async (email, values) => { // I'm not a big fan of how I've handled this part to be honest
    const { technologies, ...rest } = values
    if (role === 'candidate')
      assignRole(role, { email, [role]: {email, ...rest}, technologies: technologies.map(item => item.value) })
    else
      assignRole(role, { email, [role]: {email, ...rest} })
  };

  if (isLoading) return <Loader />;

  if (!role)
    return (
      <div>
        <PageTitle>
          <h2>ARE YOU A CANDIDATE OR A COMPANY?</h2>
        </PageTitle>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <Button variant={'secondary'} size={'medium'} action={() => setRole('candidate')}>CANDIDATE</Button>
        </div>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <Button variant={'secondary'} size={'medium'} action={() => setRole('company')}>COMPANY</Button>
        </div>
      </div>
    )

  return (
    <>
      <PageTitle>
        <h3>Register</h3>
      </PageTitle>
      <CandidateForm
        onSubmit={onFormSubmit}
        fields={role === 'candidate' ? CREATE_CANDIDATE_FIELDS : CREATE_COMPANY_FIELDS}
      ></CandidateForm>
    </>
  );
};

export default Register;
