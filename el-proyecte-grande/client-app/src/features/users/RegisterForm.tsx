import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{displayName: '', username: '', email: '', password: '', changePassword: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required('Display name is a required field'),
                username: Yup.string().required('User name is a required field'),
                email: Yup.string().required('Email address is a required field').email('Must be a valid email'),
                password: Yup.string().required('Password is a required field'),
                changePassword: Yup.string().when("password", {
                    is: (val: any) => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                      [Yup.ref("password")],
                      "Both passwords need to be the same"
                    ).required()
                  })
            })} 
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MyTextInput name='changePassword' placeholder='Confirmation Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() => 
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})