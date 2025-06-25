<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NSRP-Applicant Form</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <!-- Choices.js CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css" />
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- Choices.js JS -->
    <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
    <!-- Toastr CSS and JS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

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
        .job-card {
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .invalid-feedback {
            color: #dc3545;
            font-size: 0.875em;
            display: none;
        }
        .is-invalid ~ .invalid-feedback {
            display: block;
        }
    </style>
</head>
<body>
    <div class="loading d-none" style="
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.8);
        z-index: 9999;
    ">
        <div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="sr-only">Loading...</span>
        </div>
        <h3 style="margin-top: 1rem;">Saving...</h3>
    </div>

    <div class="container my-5">
        <h2>National Skills Registration Program Applicant Form</h2>
        <form id="nsrp2Form" novalidate>
            @csrf

            <!-- I. Personal Information -->
            <div class="section-title">I. Personal Information</div>
            <div class="row mb-3">
                <label for="fullName" class="col-sm-3 col-form-label">Full Name:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="fullName" name="full_name" value="" required>
                    <div class="invalid-feedback">Please enter your full name.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="sex" class="col-sm-3 col-form-label">Sex:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="sex" name="sex" required>
                        <option value="">Select Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <div class="invalid-feedback">Please select your sex.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="birthday" class="col-sm-3 col-form-label">Birthday:</label>
                <div class="col-sm-9">
                    <input type="date" class="form-control" id="birthday" name="birthday" value="" required>
                    <div class="invalid-feedback">Please enter your birthday.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="age" class="col-sm-3 col-form-label">Age:</label>
                <div class="col-sm-9">
                    <input type="number" class="form-control" id="age" name="age" min="15" max="100" value="" required>
                    <div class="invalid-feedback">Please enter a valid age (15-100).</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="maritalStatus" class="col-sm-3 col-form-label">Marital Status:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="maritalStatus" name="marital_status" required>
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                    </select>
                    <div class="invalid-feedback">Please select your marital status.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="disability" class="col-sm-3 col-form-label">Disability:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="disability" name="disability" value="">
                </div>
            </div>
            <div class="row mb-3">
                <label for="mobileNumber" class="col-sm-3 col-form-label">Mobile Number:</label>
                <div class="col-sm-9">
                    <input type="tel" class="form-control" id="mobileNumber" name="mobile_number" pattern="\+?[0-9\s\-()]{7,15}" value="" required>
                    <div class="invalid-feedback">Please enter a valid mobile number.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="email" class="col-sm-3 col-form-label">Email:</label>
                <div class="col-sm-9">
                    <input type="email" class="form-control" id="email" name="email" value="" required>
                    <div class="invalid-feedback">Please enter a valid email address.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="presentAddress" class="col-sm-3 col-form-label">Present Address:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="presentAddress" name="present_address" value="" required>
                    <div class="invalid-feedback">Please enter your present address.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="permanentAddress" class="col-sm-3 col-form-label">Permanent Address:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="permanentAddress" name="permanent_address" value="" required>
                    <div class="invalid-feedback">Please enter your permanent address.</div>
                </div>
            </div>

            <!-- II. Employment Status -->
            <div class="section-title">II. Employment Status</div>
            <div class="row mb-3">
                <label for="employmentStatus" class="col-sm-3 col-form-label">Employment Status:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="employmentStatus" name="employment_status" required>
                        <option value="">Select Employment Status</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-Employed">Self-Employed</option>
                    </select>
                    <div class="invalid-feedback">Please select your employment status.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="willingToWork" class="col-sm-3 col-form-label">Willing to Work Immediately:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="willingToWork" name="willing_to_work" required>
                        <option value="">Please Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <div class="invalid-feedback">Please select an option.</div>
                </div>
            </div>

            <!-- III. Education Background -->
            <div class="section-title">III. Education Background</div>
            <div class="row mb-3">
                <label for="education" class="col-sm-3 col-form-label">Education:</label>
                <div class="col-sm-9">
                    <select id="education" class="form-select" name="education" required>
                        <option value="">Select Education Level</option>
                        @if (isset($educations) && $educations->isNotEmpty())
                            @foreach ($educations as $education)
                                <option value="{{ $education->name }}">{{ $education->name }}</option>
                            @endforeach
                        @endif
                    </select>
                    <div class="invalid-feedback">Please select an education level.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="schoolGraduated" class="col-sm-3 col-form-label">School Graduated:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="schoolGraduated" name="school_graduated" value="" required>
                    <div class="invalid-feedback">Please enter the school you graduated from.</div>
                </div>
            </div>
            {{-- <div class="row mb-3">
                <label for="course" class="col-sm-3 col-form-label">Course:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="course" name="course" value="Velit voluptas nost" required>
                    <div class="invalid-feedback">Please enter your course of study.</div>
                </div>
            </div> --}}
            <div class="row mb-3">
                <label for="yearGraduated" class="col-sm-3 col-form-label">Year Graduated:</label>
                <div class="col-sm-9">
                    <input type="number" class="form-control" id="yearGraduated" name="year_graduated" min="1900" max="{{ date('Y') }}" value="" required>
                    <div class="invalid-feedback">Please enter a valid year of graduation.</div>
                </div>
            </div>

            <!-- IV. Work Experience -->
            <div class="section-title">IV. Work Experience</div>
            <div id="workExperienceContainer"></div>

            <template id="workExperienceCard">
                <div class="card job-card" role="region" aria-label="Work Experience Card">
                    <div class="row mb-3">
                        <label for="job_title_${cardIndex}" class="col-sm-3 col-form-label">Job Title:</label>
                        <div class="col-sm-9">
                            <select id="job_title_${cardIndex}" class="form-select job-title-select" name="job_title[]" required>
                                <option value="">Select Job Title</option>
                                @if (isset($positions) && $positions->isNotEmpty())
                                    @foreach ($positions as $position)
                                        <option value="{{ $position->name }}">{{ $position->name }}</option>
                                    @endforeach
                                @else
                                    <option value="Senior Dev">Senior Dev</option>
                                    <option value="Software Developer">Software Developer</option>
                                    <option value="Project Manager">Project Manager</option>
                                    <option value="Data Analyst">Data Analyst</option>
                                @endif
                            </select>
                            <div class="invalid-feedback">Please select a job title.</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="company_name_${cardIndex}" class="col-sm-3 col-form-label">Company Name:</label>
                        <div class="col-sm-9">
                            <input type="text" id="company_name_${cardIndex}" class="form-control" name="company_name[]" required>
                            <div class="invalid-feedback">Please enter the company name.</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="duration_${cardIndex}" class="col-sm-3 col-form-label">Duration (Months):</label>
                        <div class="col-sm-9">
                            <input type="number" id="duration_${cardIndex}" class="form-control" name="duration[]" min="1" required>
                            <div class="invalid-feedback">Please enter the duration in months.</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="reason_for_leaving_${cardIndex}" class="col-sm-3 col-form-label">Reason for Leaving:</label>
                        <div class="col-sm-9">
                            <input type="text" id="reason_for_leaving_${cardIndex}" class="form-control" name="reason_for_leaving[]">
                        </div>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-danger btn-sm" onclick="removeCard(this)">Remove</button>
                    </div>
                </div>
            </template>

            <button type="button" class="btn btn-primary mb-3" onclick="addWorkExperience()">Add Work Experience</button>

            <!-- V. Skills -->
            <div class="section-title">V. Skills</div>
            <div class="row mb-3">
                <label for="coreSkills" class="col-sm-3 col-form-label">Core Skills:</label>
                <div class="col-sm-9">
                    <select id="coreSkills" class="form-select coreSkills" name="core_skills[]" multiple required aria-multiselectable="true">
                        @if (isset($skills) && $skills->isNotEmpty())
                            @foreach ($skills as $skill)
                                <option value="{{ $skill->name }}">{{ $skill->name }}</option>
                            @endforeach
                        @else
                            <option value="tae" selected>tae</option>
                            <option value="PHP">PHP</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                        @endif
                    </select>
                    <div class="invalid-feedback">Please select at least one skill.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="certifications" class="col-sm-3 col-form-label">Certifications:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="certifications" name="certifications" value="">
                </div>
            </div>

            <!-- VI. Job Preferences -->
            <div class="section-title">VI. Job Preferences</div>
            <div class="row mb-3">
                <label for="preferredOccupation" class="col-sm-3 col-form-label">Preferred Occupation:</label>
                <div class="col-sm-9">
                    <select id="preferredOccupation" class="form-select preferred-occupation-select" name="preferred_occupation" required>
                        <option value="">Select Preferred Occupation</option>
                        @if (isset($positions) && $positions->isNotEmpty())
                            @foreach ($positions as $position)
                                <option value="{{ $position->name }}">{{ $position->name }}</option>
                            @endforeach
                        @else
                            <option value="Senior Dev" selected>Senior Dev</option>
                            <option value="Software Developer">Software Developer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Data Analyst">Data Analyst</option>
                        @endif
                    </select>
                    <div class="invalid-feedback">Please select a preferred occupation.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="preferredWorkLocation" class="col-sm-3 col-form-label">Preferred Work Location:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="preferredWorkLocation" name="preferred_work_location" value="">
                </div>
            </div>
            <div class="row mb-3">
                <label for="willingToWorkAbroad" class="col-sm-3 col-form-label">Willing to Work Abroad:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="willingToWorkAbroad" name="willing_to_work_abroad" required>
                        <option value="">Select Option</option>
                        <option value="No" selected>No</option>
                        <option value="Yes">Yes</option>
                    </select>
                    <div class="invalid-feedback">Please select an option.</div>
                </div>
            </div>

            <!-- VII. Other Information -->
            <div class="section-title">VII. Other Information</div>
            <div class="row mb-3">
                <label for="governmentId" class="col-sm-3 col-form-label">Government ID:</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="governmentId" name="government_id" value="">
                </div>
            </div>
            <div class="row mb-3">
                <label for="languageSpoken" class="col-sm-3 col-form-label">Language Spoken:</label>
                <div class="col-sm-9">
                    <select id="languageSpoken" class="form-select languageSpoken" name="language_spoken[]" multiple required aria-multiselectable="true">
                        @if (isset($languages) && $languages->isNotEmpty())
                            @foreach ($languages as $language)
                                <option value="{{ $language->name }}" {{ in_array($language->name, ['Tagalog', 'English']) ? 'selected' : '' }}>{{ $language->name }}</option>
                            @endforeach
                        @else
                            <option value="Tagalog">Tagalog</option>
                            <option value="English">English</option>
                            <option value="Cebuano">Cebuano</option>
                            <option value="Ilocano">Ilocano</option>
                        @endif
                    </select>
                    <div class="invalid-feedback">Please select at least one language.</div>
                </div>
            </div>
            <div class="row mb-3">
                <label for="internetAccess" class="col-sm-3 col-form-label">With Internet Access:</label>
                <div class="col-sm-9">
                    <select class="form-select" id="internetAccess" name="internet_access" required>
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <div class="invalid-feedback">Please select an option.</div>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="text-end">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>

    <script>
        let cardIndex = 0;

        function addWorkExperience() {
            const template = document.getElementById('workExperienceCard');
            const clone = template.content.cloneNode(true);

            // Update index-based IDs, names, and labels
            clone.querySelectorAll('[id], [name], [for]').forEach(el => {
                if (el.id) {
                    el.id = el.id.replace('${cardIndex}', cardIndex);
                }
                if (el.getAttribute('for')) {
                    el.setAttribute('for', el.getAttribute('for').replace('${cardIndex}', cardIndex));
                }
            });

            const container = document.getElementById('workExperienceContainer');
            const wrapper = document.createElement('div');
            wrapper.appendChild(clone);
            container.appendChild(wrapper);

            // Initialize Choices.js for job_title select
            const jobTitleSelect = wrapper.querySelector('.job-title-select');
            if (jobTitleSelect && !jobTitleSelect.classList.contains('choices-initialized')) {
                const choices = new Choices(jobTitleSelect, {
                    removeItemButton: false,
                    shouldSort: false,
                    searchEnabled: true,
                    searchPlaceholderValue: 'Search job title...',
                    itemSelectText: '',
                    classNames: {
                        containerOuter: 'choices',
                        containerInner: 'choices__inner',
                        input: 'choices__input',
                        inputCloned: 'choices__input--cloned',
                        list: 'choices__list',
                        listItems: 'choices__list--single',
                        listSingle: 'choices__list--single',
                        listDropdown: 'choices__list--dropdown',
                        item: 'choices__item',
                        itemSelectable: 'choices__item--selectable',
                        itemDisabled: 'choices__item--disabled',
                        itemChoice: 'choices__item--choice',
                        placeholder: 'choices__placeholder',
                        group: 'choices__group',
                        groupHeading: 'choices__heading',
                        button: 'choices__button',
                        activeState: 'is-active',
                        focusState: 'is-focused',
                        openState: 'is-open',
                        disabledState: 'is-disabled',
                        highlightedState: 'is-highlighted',
                        selectedState: 'is-selected',
                        flippedState: 'is-flipped',
                        loadingState: 'is-loading',
                        noResults: 'has-no-results',
                        noChoices: 'has-no-choices'
                    }
                });
                jobTitleSelect.classList.add('choices-initialized');

                // Enhance accessibility
                const input = jobTitleSelect.parentElement.querySelector('.choices__input');
                input.setAttribute('tabindex', '0');
                input.setAttribute('aria-label', 'Search and select job title');

                // Validate on change
                jobTitleSelect.addEventListener('change', () => {
                    if (!jobTitleSelect.value) {
                        jobTitleSelect.classList.add('is-invalid');
                    } else {
                        jobTitleSelect.classList.remove('is-invalid');
                    }
                });
            }

            cardIndex++;
        }

        function removeCard(btn) {
            btn.closest('.job-card').remove();
        }

        function initializeChoices() {
            document.querySelectorAll('select[multiple]').forEach(select => {
                if (!select.classList.contains('choices-initialized')) {
                    const choices = new Choices(select, {
                        removeItemButton: true,
                        shouldSort: false,
                        searchEnabled: true,
                        itemSelectText: '',
                        classNames: {
                            containerOuter: 'choices',
                            containerInner: 'choices__inner',
                            input: 'choices__input',
                            inputCloned: 'choices__input--cloned',
                            list: 'choices__list',
                            listItems: 'choices__list--multiple',
                            listSingle: 'choices__list--single',
                            listDropdown: 'choices__list--dropdown',
                            item: 'choices__item',
                            itemSelectable: 'choices__item--selectable',
                            itemDisabled: 'choices__item--disabled',
                            itemChoice: 'choices__item--choice',
                            placeholder: 'choices__placeholder',
                            group: 'choices__group',
                            groupHeading: 'choices__heading',
                            button: 'choices__button',
                            activeState: 'is-active',
                            focusState: 'is-focused',
                            openState: 'is-open',
                            disabledState: 'is-disabled',
                            highlightedState: 'is-highlighted',
                            selectedState: 'is-selected',
                            flippedState: 'is-flipped',
                            loadingState: 'is-loading',
                            noResults: 'has-no-results',
                            noChoices: 'has-no-choices'
                        }
                    });
                    select.classList.add('choices-initialized');

                    // Enhance accessibility
                    const input = select.parentElement.querySelector('.choices__input');
                    input.setAttribute('tabindex', '0');
                    const label = select.closest('.row').querySelector('label').textContent;
                    input.setAttribute('aria-label', `Select ${label}`);

                    // Validate multiple select on change
                    select.addEventListener('change', () => {
                        if (choices.getValue(true).length === 0 && select.hasAttribute('required')) {
                            select.classList.add('is-invalid');
                        } else {
                            select.classList.remove('is-invalid');
                        }
                    });
                }
            });

            // Initialize Choices.js for preferred_occupation select
            const preferredOccupationSelect = document.querySelector('.preferred-occupation-select');
            if (preferredOccupationSelect && !preferredOccupationSelect.classList.contains('choices-initialized')) {
                const choices = new Choices(preferredOccupationSelect, {
                    removeItemButton: false,
                    shouldSort: false,
                    searchEnabled: true,
                    searchPlaceholderValue: 'Search preferred occupation...',
                    itemSelectText: '',
                    classNames: {
                        containerOuter: 'choices',
                        containerInner: 'choices__inner',
                        input: 'choices__input',
                        inputCloned: 'choices__input--cloned',
                        list: 'choices__list',
                        listItems: 'choices__list--single',
                        listSingle: 'choices__list--single',
                        listDropdown: 'choices__list--dropdown',
                        item: 'choices__item',
                        itemSelectable: 'choices__item--selectable',
                        itemDisabled: 'choices__item--disabled',
                        itemChoice: 'choices__item--choice',
                        placeholder: 'choices__placeholder',
                        group: 'choices__group',
                        groupHeading: 'choices__heading',
                        button: 'choices__button',
                        activeState: 'is-active',
                        focusState: 'is-focused',
                        openState: 'is-open',
                        disabledState: 'is-disabled',
                        highlightedState: 'is-highlighted',
                        selectedState: 'is-selected',
                        flippedState: 'is-flipped',
                        loadingState: 'is-loading',
                        noResults: 'has-no-results',
                        noChoices: 'has-no-choices'
                    }
                });
                preferredOccupationSelect.classList.add('choices-initialized');

                // Enhance accessibility
                const input = preferredOccupationSelect.parentElement.querySelector('.choices__input');
                input.setAttribute('tabindex', '0');
                input.setAttribute('aria-label', 'Search and select preferred occupation');

                // Validate on change
                preferredOccupationSelect.addEventListener('change', () => {
                    if (!preferredOccupationSelect.value) {
                        preferredOccupationSelect.classList.add('is-invalid');
                    } else {
                        preferredOccupationSelect.classList.remove('is-invalid');
                    }
                });
            }
        }

        function validateForm(form) {
            let isValid = true;
            form.querySelectorAll('input[required], select[required]').forEach(field => {
                if (!field.value || (field.multiple && field.choices && field.choices.getValue(true).length === 0)) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            return isValid;
        }

        function handleSubmit(event) {
            event.preventDefault();
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const form = document.getElementById('nsrp2Form');
            if (!validateForm(form)) {
                toastr.error('Please fill out all required fields.');
                return;
            }

            const formData = new FormData(form);
            const json = {
                access_code:id,
                full_name: formData.get('full_name'),
                sex: formData.get('sex'),
                birthday: formData.get('birthday'),
                age: formData.get('age'),
                marital_status: formData.get('marital_status'),
                disability: formData.get('disability'),
                mobile_number: formData.get('mobile_number'),
                email: formData.get('email'),
                present_address: formData.get('present_address'),
                permanent_address: formData.get('permanent_address'),
                employment_status: {
                    employment_status: formData.get('employment_status'),
                    willing_to_work: formData.get('willing_to_work')
                },
                education: formData.get('education'),
                school_graduated: formData.get('school_graduated'),
                // course: formData.get('course'),
                year_graduated: formData.get('year_graduated'),
                work_experience: [],
                core_skills: formData.getAll('core_skills[]'),
                certifications: formData.get('certifications'),
                preferred_occupation: formData.get('preferred_occupation'),
                preferred_work_location: formData.get('preferred_work_location'),
                willing_to_work_abroad: formData.get('willing_to_work_abroad'),
                government_id: formData.get('government_id'),
                language_spoken: formData.getAll('language_spoken[]'),
                internet_access: formData.get('internet_access')
            };

            const cardCount = document.querySelectorAll('.job-card').length;
            for (let i = 0; i < cardCount; i++) {
                const workExp = {
                    job_title: formData.getAll('job_title[]')[i],
                    company_name: formData.getAll('company_name[]')[i],
                    duration: formData.getAll('duration[]')[i],
                    reason_for_leaving: formData.getAll('reason_for_leaving[]')[i] || ''
                };
                json.work_experience.push(workExp);
            }

            console.log(JSON.stringify(json, null, 2));
            save(json);
        }

        function save(data) {
            console.log(data);
            $('.loading').removeClass('d-none');
            $.ajax({
                url: '/nsrp2/save',
                type: 'POST',
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(response) {
                    console.log('Success:', response);
                    toastr.success('Successfully saved!');
                    window.location.href = '/nsrp2/success';
                },
                error: function(xhr) {
                    $('.loading').addClass('d-none');
                    console.error('Error:', xhr.responseText);
                    toastr.error('An error occurred while saving.');
                },
                complete: function() {
                    $('.loading').addClass('d-none');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            initializeChoices();
            // Pre-populate work experience cards
            const workExperiences = [
                {
                    job_title: "",
                    company_name: "",
                    duration: "",
                    reason_for_leaving: ""
                },
                {
                    job_title: "",
                    company_name: "",
                    duration: "",
                    reason_for_leaving: ""
                }
            ];
            workExperiences.forEach(exp => {
                addWorkExperience();
                const card = document.querySelectorAll('.job-card')[cardIndex - 1];
                card.querySelector(`[name="job_title[]"]`).value = exp.job_title;
                card.querySelector(`[name="company_name[]"]`).value = exp.company_name;
                card.querySelector(`[name="duration[]"]`).value = exp.duration;
                card.querySelector(`[name="reason_for_leaving[]"]`).value = exp.reason_for_leaving;
                // Re-initialize Choices.js for the job_title select
                const jobTitleSelect = card.querySelector('.job-title-select');
                if (jobTitleSelect.choices) {
                    jobTitleSelect.choices.setChoiceByValue(exp.job_title);
                }
            });
            document.getElementById('nsrp2Form').addEventListener('submit', handleSubmit);
        });
    </script>
</body>
</html>