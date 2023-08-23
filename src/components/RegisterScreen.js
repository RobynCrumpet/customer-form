import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CountrySelect from 'react-bootstrap-country-select';
import FormContainer from '../components/FormContainer';



const RegisterScreen = () => {
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const calcAge = (dateString) => {
        const today = new Date()
        const birthDate = new Date(dateString)
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age 
    }
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        })

        if(!!errors[field])
        setErrors({
            ...errors,
            [field]:null
        })

    }

    const validateForm = ()=>{
        const { dob, gender, location, seeking, bio } = form
        const newErrors ={}

        if(!dob || dob === '') newErrors.dob = 'Please enter your date of birth'
        else if(calcAge(dob) < 18)
            newErrors.dob = 'You need to be at least 18 years old.'
        if (!gender || gender === 'Select Gender')
            newErrors.gender = 'Please select gender'
        if (!location || location === '')
        newErrors.location = 'Please choose your location'
        if (!seeking || seeking === 'What are you looking for?')
        newErrors.seeking = 'Please select what you are seeking for?'
        if (!bio || bio === '')
        newErrors.bio = 'Please write something about yourself.'
        else if (bio.length < 10) newErrors.bio = 'Bio is too short'

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()

        const formErrors = validateForm()
        if(Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        }else{
            console.log('form submitted')
            console.log(form)
        }

       
    }
    return (
        <FormContainer>
            <h2>Complete your profile</h2>
            <form>
                <Form.Group controlID='dob'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type='date' 
                    placeholder='Enter date of birth'
                    value = {form.dob}
                    onChange={(e) => setField('dob', e.target.value)}
                    isInvalid={!!errors.dob}>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.dob}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlID='gender'>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                    placeholder='Select Gender'>
                        <option>Select Gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlID='country'>
                    <Form.Label>Location</Form.Label>
                    <CountrySelect 
                    className={!!errors.location && 'red-border'}
                    id='country'
                    autoComplete='off'
                    throwInavlidValueError={true}
                    required
                    valueAs ='id'
                    value={form.location}
                    onChange={(selected) => {
                        console.log(selected)
                        setField('location', selected)
                    }}/>
                    <div className='red'>{errors.location}</div>
                </Form.Group>

                <Form.Group controlID='seeking'>
                    <Form.Label>Seeking</Form.Label>
                    <Form.Select type='text' placeholder='Enter Seeking'>
                        <option>What are you looking for?</option>
                        <option value='D'>Dating</option>
                        <option value='F'>Friendship</option>
                        <option value='F'>Business Networking</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlID='bio'>
                    <Form.Label>Short Bio / Description</Form.Label>
                    <Form.Control as='textarea'
                    rows={2}
                    type='textarea'
                    placeholder='Enter Short Bio / Description'
                    value={form.bio}
                    isInvalid={!!errors.bio}
                    onChange={(e) => setField('bio', e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.bio}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlID='Submit'>
                <Button type='submit' onClick={handleSubmit} className='my-2' variant='primary'>Continue</Button>
                </Form.Group>

            </form>
        </FormContainer>
    )
}

export default RegisterScreen 