import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { jobsApplied } from '../assets/assets';
import moment from 'moment'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>

        <div className='flex gap-2 mb-6 mt-3'>
          {isEdit ? (
            <>
              {/* Hidden input */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handleUploadClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {fileName ? fileName : 'Upload Resume'}
              </button>

              <button
                onClick={() => setIsEdit(false)}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
              <a
                href="#"
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <button
                className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className='text-xl font-semibold mb-4'>Job Applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b text-left'>Compnay</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm-hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm-hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>

            </tr>

          </thead>
          <tbody>
            {jobsApplied.map((job,index)=> true ? (
              <tr>
                <td className='py-3 px-4 flex-center gap-2 border-b' >
                  <img className="w-12 h-15"src={job.logo} alt="" />
                  {job.company}
                </td>
               <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm-hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b max-sm-hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b'>
                  <span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100' } px-4 py-1.5 rounded`}>
                    {job.status}

                  </span>
                  
                  </td>
              </tr>
            ) : (null) )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Applications;
