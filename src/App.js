import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const JobApplicationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [portfolioURL, setPortfolioURL] = useState('');
  const [managementExperience, setManagementExperience] = useState('');
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [preferredInterviewTime, setPreferredInterviewTime] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Email is not valid';
    if (!phone) newErrors.phone = 'Phone Number is required';
    if (!position) newErrors.position = 'Position is required';

    if (position === 'Developer' || position === 'Designer') {
      if (!experience || experience <= 0) {
        newErrors.experience = 'Relevant Experience is required and must be greater than 0';
      }
    }

    if (position === 'Designer') {
      if (!portfolioURL) newErrors.portfolioURL = 'Portfolio URL is required';
      else {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlPattern.test(portfolioURL)) {
          newErrors.portfolioURL = 'Portfolio URL must be a valid URL';
        }
      }
    }

    if (position === 'Manager') {
      if (!managementExperience) newErrors.managementExperience = 'Management Experience is required';
    }

    if (additionalSkills.length === 0) newErrors.additionalSkills = 'At least one skill must be selected';
    if (!preferredInterviewTime) newErrors.preferredInterviewTime = 'Preferred Interview Time is required';

    if (Object.keys(newErrors).length === 0) {
      // If no errors, prepare and display the summary
      let message = `Job Application Form Summary\n`;
      message += `Full Name: ${fullName}\n`;
      message += `Email: ${email}\n`;
      message += `Phone Number: ${phone}\n`;
      message += `Applying for Position: ${position}\n`;

      if (position === 'Developer' || position === 'Designer') {
        message += `Relevant Experience: ${experience} years\n`;
      }

      if (position === 'Designer') {
        message += `Portfolio URL: ${portfolioURL}\n`;
      }

      if (position === 'Manager') {
        message += `Management Experience: ${managementExperience}\n`;
      }

      message += `Additional Skills: ${additionalSkills.join(', ')}\n`;
      message += `Preferred Interview Time: ${preferredInterviewTime}`;

      alert(message);
    } else {
      // If there are errors, set them to state to display in UI
      setErrors(newErrors);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <center>
            <label><b>Objective: </b>Build a more complex form with nested conditional fields, multiple field types, and enhanced validation. </label>
          </center>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="fullName" >
                Full Name<span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" id="fullName" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} value={fullName} onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" >
                Email<span style={{ color: 'red' }}>*</span>
              </label>
              <input  type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" >
                Phone Number<span style={{ color: 'red' }}>*</span>
              </label>
              <input type="number" id="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={phone} onChange={(e) => setPhone(e.target.value)} />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="position" >
                Applying for Position<span style={{ color: 'red' }}>*</span>
              </label>
              <select id="position" className={`form-select ${errors.position ? 'is-invalid' : ''}`} value={position} onChange={(e) => setPosition(e.target.value)} >
                <option value="">Select...</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.position && <div className="invalid-feedback">{errors.position}</div>}
            </div>
            {(position === 'Developer' || position === 'Designer') && (
              <div className="mb-3">
                <label htmlFor="experience" >
                  Relevant Experience (years)
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input type="number" id="experience" className={`form-control ${errors.experience ? 'is-invalid' : ''}`} value={experience} onChange={(e) => setExperience(e.target.value)}/>
                {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
              </div>
            )}
            {position === 'Designer' && (
              <div className="mb-3">
                <label htmlFor="portfolioURL" >
                  Portfolio URL<span style={{ color: 'red' }}>*</span>
                </label>
                <input type="text" id="portfolioURL" className={`form-control ${errors.portfolioURL ? 'is-invalid' : ''}`} value={portfolioURL} onChange={(e) => setPortfolioURL(e.target.value)}/>
                {errors.portfolioURL && <div className="invalid-feedback">{errors.portfolioURL}</div>}
              </div>
            )}
            {position === 'Manager' && (
              <div className="mb-3">
                <label htmlFor="managementExperience" >
                  Management Experience<span style={{ color: 'red' }}>*</span>
                </label>
                <textarea id="managementExperience" className={`form-control ${errors.managementExperience ? 'is-invalid' : ''}`} value={managementExperience} onChange={(e) => setManagementExperience(e.target.value)}/>
                {errors.managementExperience && (
                <div className="invalid-feedback">{errors.managementExperience}</div>
                )}
              </div>
            )}
            <div className="mb-3">
              <label >Additional Skills<span style={{ color: 'red' }}>*</span></label>
              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox" id="javascriptSkill"  value="JavaScript" checked={additionalSkills.includes('JavaScript')}
                    onChange={(e) =>
                      e.target.checked
                        ? setAdditionalSkills([...additionalSkills, 'JavaScript'])
                        : setAdditionalSkills(
                            additionalSkills.filter((skill) => skill !== 'JavaScript')
                          )
                    }
                  />
                  <label>JavaScript</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="checkbox"  id="cssSkill"  value="CSS" checked={additionalSkills.includes('CSS')}
                    onChange={(e) =>
                      e.target.checked
                        ? setAdditionalSkills([...additionalSkills, 'CSS'])
                        : setAdditionalSkills(
                            additionalSkills.filter((skill) => skill !== 'CSS')
                          )
                    }
                  />
                  <label>CSS</label>
                </div>
                <div>
                  <input className="form-check-input" type="checkbox" id="pythonSkill" value="Python" checked={additionalSkills.includes('Python')}
                    onChange={(e) =>
                      e.target.checked
                        ? setAdditionalSkills([...additionalSkills, 'Python'])
                        : setAdditionalSkills(
                            additionalSkills.filter((skill) => skill !== 'Python')
                          )
                    }
                  />
                  <label> Python</label>
                </div>
              </div>
              {errors.additionalSkills && (
                <div className="invalid-feedback">{errors.additionalSkills}</div>
              )}
            </div>
            <div className="mb-3">
              <label>
                Preferred Interview Time<span style={{ color: 'red' }}>*</span>
              </label>
              <input type="date" id="preferredInterviewTime" className={`form-control ${errors.preferredInterviewTime ? 'is-invalid' : ''}`} value={preferredInterviewTime} onChange={(e) => setPreferredInterviewTime(e.target.value)}/>
              {errors.preferredInterviewTime && (
                <div className="invalid-feedback">{errors.preferredInterviewTime}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
