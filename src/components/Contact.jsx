import React from 'react'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

import { styles } from '../style'
import { EarthCanvas } from './canvas'

import { SectionWrapper } from '../hoc'

import { slideIn } from '../utils/motion'

const Contact = () => {
  const formRef = useRef();
  const [form ,setForm] = useState({
    name:'',
    email:'',
    message:''
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    console.log(e);
    const {name, value} = e.target;
    console.log(name, value);
    setForm({...form, [name]:value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send( import.meta.SERVICE_ID , import.meta.TEMPLATE_ID, {
      from_name:form.name,
      to_name:'Amith',
      from_email:form.email,
      to_email:"amithkouti@gmail.com",
      message:form.message
    },
      import.meta.PUBLIC_API_KEY
     ).then(() => {
      setLoading(false);
      alert('Thank You, I will get back to you As soon as possible :)');
      setForm({
        name:'',
        email:'',
        message:''
      })
     }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something Went Wrong.');
     })
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
      variants={slideIn(
        'left',
        "tween",
        0.2,
        1
      )} className="flex-[0.75] bg-black-100 rounded-2xl p-8"
      >
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
        ref = {formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input type="text" name="name" value={form.name} placeholder="What's your name"  
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none
              border-none font-medium"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Email</span>
            <input type="email" name="email" value={form.email} placeholder="What's your Email"  
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none
              border-none font-medium"
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea rows="7" name="message" value={form.message} placeholder="What do you want to say?"  
              onChange={handleChange}
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none
              border-none font-medium"
            />
          </label>
          <button
          type='submit'
          className='bg-tertiary py-3 px-8 outline-none rounded-xl w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? 'Sending...':'Send'}
          </button>
        </form>
      </motion.div>
      <motion.div
      variants={slideIn(
        'right',
        "tween",
        0.2,
        1
      )}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")