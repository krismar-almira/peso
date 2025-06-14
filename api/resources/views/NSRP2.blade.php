<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NSRP-2 Form</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Bootstrap 5 CSS -->
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            background-color: #f8f9fa;
        }
        .section-title {
            background-color: #e9ecef;
            padding: 10px;
            font-weight: bold;
            margin-top: 20px;
            border-radius: 5px;
        }
        .container {
            max-width: 900px;
        }
        h2 {
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container my-5">
        <h2>National Skills Registration Program (NSRP-2) Form</h2>
        <form>
            <!-- I. Personal Information -->
            <div class="section-title">I. Personal Information</div>
            <div class="row mb-3">
                <label for="fullName" class="col-sm-3 col-form-label">Full Name:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="fullName" value="Juan Dela Cruz" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="sex" class="col-sm-3 col-form-label">Sex:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="sex" required>
                        <option value="Male" selected>Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="birthdate" class="col-sm-3 col-form-label">Birthdate:</label>
                <div class="col-sm-9">
                    <input type="date" class="form-control" id="birthdate" value="1990-01-01" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="age" class="col-sm-3 col-form-label">Age:</label>
                <div class="col-sm-9">
                    <input type="number" class="form-control" id="age" value="35" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="maritalStatus" class="col-sm-3 col-form-label">Marital Status:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="maritalStatus" required>
                        <option value="Single" selected>Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="disability" class="col-sm-3 col-form-label">Disability:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="disability" value="None">
                </div>
            </div>
            <div class="row mb-3">
                <label for="mobileNumber" class="col-sm-3 col-form-label">Mobile Number:</label>
                <div class="col-sm-9">
                    <input type="tel" class="form-control" id="mobileNumber" value="09171234567" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-sm-3 col-form-label">Email:</label>
                <div class="col-sm-9">
                    <input type="email" class="form-control" id="email" value="juan@example.com" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="presentAddress" class="col-sm-3 col-form-label">Present Address:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="presentAddress" value="123 Mabini St., Manila" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="permanentAddress" class="col-sm-3 col-form-label">Permanent Address:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="permanentAddress" value="123 Mabini St., Manila" required>
                </div>
            </div>

            <!-- II. Employment Status -->
            <div class="section-title">II. Employment Status</div>
            <div class="row mb-3">
                <label for="employmentStatus" class="col-sm-3 col-form-label">Employment Status:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="employmentStatus" required>
                        <option value="Unemployed" selected>Unemployed</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="willingToWork" class="col-sm-3 col-form-label">Willing to Work Immediately:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="willingToWork" required>
                        <option value="Yes" selected>Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <!-- III. Education Background -->
            <div class="section-title">III. Education Background</div>
            <div class="row mb-3">
                <label for="highestEducation" class="col-sm-3 col-form-label">Highest Educational Attainment:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="highestEducation" value="Bachelor's Degree" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="schoolGraduated" class="col-sm-3 col-form-label">School Graduated:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="schoolGraduated" value="University of the Philippines" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="course" class="col-sm-3 col-form-label">Course:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="course" value="BS Computer Science" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="yearGraduated" class="col-sm-3 col-form-label">Year Graduated:</label>
                <div class="col-sm-9">
                    <input type="number" class="form-control" id="yearGraduated" value="2011" required>
                </div>
            </div>

            <!-- IV. Work Experience -->
            <div class="section-title">IV. Work Experience</div>
            <div class="row mb-3">
                <label for="jobTitle" class="col-sm-3 col-form-label">Latest Job Title:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="jobTitle" value="Web Developer">
                </div>
            </div>
            <div class="row mb-3">
                <label for="companyName" class="col-sm-3 col-form-label">Company Name:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="companyName" value="ABC Web Solutions">
                </div>
            </div>
            <div class="row mb-3">
                <label for="inclusiveDates" class="col-sm-3 col-form-label">Inclusive Dates:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="inclusiveDates" value="2015 - 2023">
                </div>
            </div>
            <div class="row mb-3">
                <label for="reasonForLeaving" class="col-sm-3 col-form-label">Reason for Leaving:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="reasonForLeaving" value="Contract Ended">
                </div>
            </div>

            <!-- V. Skills -->
            <div class="section-title">V. Skills</div>
            <div class="row mb-3">
                <label for="coreSkills" class="col-sm-3 col-form-label">Core Skills:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="coreSkills" value="PHP, Laravel, JavaScript, HTML, CSS">
                </div>
            </div>
            <div class="row mb-3">
                <label for="certifications" class="col-sm-3 col-form-label">Certifications:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="certifications" value="NC II - Computer Programming">
                </div>
            </div>

            <!-- VI. Job Preferences -->
            <div class="section-title">VI. Job Preferences</div>
            <div class="row mb-3">
                <label for="preferredOccupation" class="col-sm-3 col-form-label">Preferred Occupation:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="preferredOccupation" value="Software Developer">
                </div>
            </div>
            <div class="row mb-3">
                <label for="preferredWorkLocation" class="col-sm-3 col-form-label">Preferred Work Location:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="preferredWorkLocation" value="Metro Manila">
                </div>
            </div>
            <div class="row mb-3">
                <label for="willingToWorkAbroad" class="col-sm-3 col-form-label">Willing to Work Abroad:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="willingToWorkAbroad">
                        <option value="No" selected>No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>
            </div>

            <!-- VII. Other Information -->
            <div class="section-title">VII. Other Information</div>
            <div class="row mb-3">
                <label for="governmentId" class="col-sm-3 col-form-label">Government ID:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="governmentId" value="TIN, PhilHealth">
                </div>
            </div>
            <div class="row mb-3">
                <label for="languageSpoken" class="col-sm-3 col-form-label">Language Spoken:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="languageSpoken" value="Filipino, English">
                </div>
            </div>
            <div class="row mb-3">
                <label for="internetAccess" class="col-sm-3 col-form-label">With Internet Access:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="internetAccess">
                        <option value="Yes" selected>Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            <!-- VIII. PESO Officer Section -->
            <div class="section-title">VIII. PESO Officer Section</div>
            <div class="row mb-3">
                <label for="dateRegistered" class="col-sm-3 col-form-label">Date Registered:</label>
                <div class="col-sm-9">
                    <input type="date" class="form-control" id="dateRegistered" value="2025-06-13" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="registeredBy" class="col-sm-3 col-form-label">Registered By:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="registeredBy" value="Maria Santos (PESO Officer)" required>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="text-end">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>

</body>
</html>