import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Make sure this is imported for styling
import { JobCategories, JobLocations } from '../assets/assets';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [salary, setSalary] = useState();
    const [description, setDescription] = useState('');

    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });

            quillRef.current.on('text-change', () => {
                setDescription(quillRef.current.root.innerHTML);
            });
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const jobData = {
            title,
            location,
            category,
            level,
            salary,
            description
        };
        console.log('Job Posted:', jobData);
        // You can send jobData to the server using fetch/axios here
    };

    return (
        <form className="container p-4 flex flex-col w-full items-start gap-3"onSubmit={handleSubmit}>
            <div className='w-full'>
                <p className='mb-2'>Job Title</p>
                <input
                    type='text'
                    placeholder='Type here'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    required
                    className='w-full max-w-lg py-2 border-2 border-grey-300 rounded'
                />
            </div>

            
            <div className='w-full max-w-lg'>
                <p >Job Description</p>
                <div ref={editorRef} style={{ height: '50px', marginBottom: '1rem' }} />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
                <p className='mb-2'>Job Category</p>
                <select className='w-full px-3 py-3 border-2 border-grey-300 rounded'>

                    onChange={e => setCategory(e.target.value)}
                    {JobCategories.map((category, index) => (
                        <option key={index} value={category}> {category}</option>
                    ))}
                </select>
            </div>
            
            <div>
                <p className='mb-2'>Job Location</p>
                <select className='w-full px-3 py-3 border-2 border-grey-300 rounded'>

                    onChange={e => setLocation(e.target.value)}
                    {JobLocations.map((location, index) => (
                        <option key={index} value={location}> {location}</option>
                    ))}
                </select>
            </div>

            <div>
                <p className='mb-2'>Job Level</p>
                <select className='w-full px-3 py-3 border-2 border-grey-300 rounded'>
                    onChange={e => setLevel(e.target.value)}
                    <option value="Beginner level"> Beginner level</option>
                    <option value="Intermediate level"> Intermediate level</option>
                    <option value="Senior level"> Senior level</option>
                    
                </select>
            </div>
         </div>
            <div>
                <p className='mb-2'>Job Salary</p>
                <input min={0} className='w-full px-3 py-2 border-2 border-grey-300 rounded sm:w-[120px]' onChange={ e => setSalary(e.target.value) }  type="Number" placeholder="25000"  />
            </div>

            
           <button className='w-28 py-3 mt-4 bg-black text-white rounded' >ADD</button>

          
        </form>
    );
};

export default AddJob;
