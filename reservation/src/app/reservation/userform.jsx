'use client';

import { Formik, Form, Field } from "formik";
import { addClient, setReservation } from "@/lib/features/reservation/reservationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as Yup from 'yup';







const UserForm = () => {
    const [clientList, setClientList] = useState([])
    const [isClientList, setIsClientList] = useState(false);

    const phoneRegExp = /^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/
    const zipRegexp = /^[0-9]+$/
    const formValidation = Yup.object().shape({
        given_name: Yup.string().min(2, 'Too Short').max(50, 'Too Long').required('Required'),
        surname: Yup.string().min(2, "Too Short").max(50, "Too Long").required('Required'),
        phone_number: Yup.string().matches(phoneRegExp, 'Phone number not in correct format').required('Required'),
        zipcode: Yup.string().matches(zipRegexp, "Only digits").min(5, 'Must be 5 digits').max(5, 'Must be 5 digits').required('Required'),
    });


    const initialValues = {
        client_given_name: '',
        client_surname: '',
        client_phone_number: '',
        client_zipcode: '',
    }

    const handleSubmit = (values, { resetForm }, ...clientList) => {
        setClientList(...clientList.push(values))
        resetForm();
        console.log(clientList)
        setIsClientList(true)
    }



    return (
        <>
            <div className={'mx-auto max-w-96 border-2 px-4 py-4 '}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={formValidation}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className={'flex flex-col'}>
                            <label htmlFor="given_name">Given Name</label>
                            <Field name='given_name' className={'text-black px-1 rounded-md'} />
                            {errors.firstName && touched.firstName ? (
                                <div>{errors.firstName}</div>
                            ) : null}
                            <label htmlFor="surname">Surname</label>
                            <Field name='surname' className={'text-black px-1 rounded-md'} />
                            {errors.surname && touched.surname ? (
                                <div>{errors.surname}</div>
                            ) : null}
                            <label htmlFor="phone_number">Phone_number</label>
                            <Field name='phone_number' className={'text-black px-1 rounded-md'} />
                            {errors.phone_number && touched.phone_number ? (
                                <div>{errors.phone_number}</div>
                            ) : null}
                            <label htmlFor="zipcode">Zipcode</label>
                            <Field name='zipcode' className={'text-black px-1 rounded-md'} />
                            {errors.zipcode && touched.zipcode ? (
                                <div>{errors.zipcode}</div>
                            ) : null}
                            <div className={"flex flex-row my-4 text-black "}>
                                <button className={'bg-white rounded-lg max-w-48 mx-auto px-4'} type='submit' disabled={isSubmitting}>Add Client</button>
                                <button className={'bg-white rounded-lg max-w-48 mx-auto px-4'} type='reset' disabled={isSubmitting}>Reset</button>


                            </div>
                        </Form>
                    )}

                </Formik>
            </div>
            <h3>Attending Clients</h3>
            {isClientList && (
                <ul>
                    {clientList.map((client, index) => (
                        <li key={index}>
                            {client.client_given_name} {client.client_surname}
                        </li>
                    ))}
                </ul>
            )}

        </>

    )
}

export default UserForm;