<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NSRP-1 Form</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
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
    <div class="loading d-none" style="
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background: rgba(255, 255, 255, 0.8); /* optional overlay */
        z-index: 9999;
    ">
        <div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="sr-only">Loading...</span>
        </div>
        <h3 style="margin-top: 1rem;">Saving...</h3>
    </div>

    <div class="container my-5">
        <h2>National Skills Registration Program (NSRP-1) Form</h2>
        <form id="nsrpForm">
            @csrf

            <!-- I. Establishment Information -->
            <div class="section-title">I. Establishment Information</div>
            <div class="row mb-3">
                <label for="establishment" class="col-sm-3 col-form-label">Establishment Name:</label>
                <div class="col-sm-9">
                    <input type="text" id="establishment" class="form-control" name="establishment" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="business_address" class="col-sm-3 col-form-label">Business Address:</label>
                <div class="col-sm-9">
                    <input type="text" id="business_address" class="form-control" name="business_address" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="industry_classification" class="col-sm-3 col-form-label">Industry Classification:</label>
                <div class="col-sm-9">
                    <input type="text" id="industry_classification" class="form-control" name="industry_classification" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="business_type" class="col-sm-3 col-form-label">Business Type:</label>
                <div class="col-sm-9">
                    <select id="business_type" class="form-select" name="business_type" required>
                        <option value="Private" selected>Private</option>
                        <option value="Public">Public</option>
                        <option value="Non-Profit">Non-Profit</option>
                    </select>
                </div>
            </div>
            <div class="row mb-3">
                <label for="contact_person" class="col-sm-3 col-form-label">Contact Person:</label>
                <div class="col-sm-9">
                    <input type="text" id="contact_person" class="form-control" name="contact_person" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="designation" class="col-sm-3 col-form-label">Designation:</label>
                <div class="col-sm-9">
                    <input type="text" id="designation" class="form-control" name="designation" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="contact_number" class="col-sm-3 col-form-label">Contact Number:</label>
                <div class="col-sm-9">
                    <input type="tel" id="contact_number" class="form-control" name="contact_number" required>
                </div>
            </div>
            <div class="row mb-3">
                <label for="email_address" class="col-sm-3 col-form-label">Email Address:</label>
                <div class="col-sm-9">
                    <input type="email" id="email_address" class="form-control" name="email_address" required>
                </div>
            </div>

            <!-- II. Vacancy Information -->
            <div class="section-title">II. Vacancy Information & III. Qualification Requirements</div>

            <div id="cardContainer"></div>

            <template id="templateCard">
                <div class="card job-card" style="padding:10px; margin-bottom: 15px; border: 1px solid #ccc;" role="region" aria-label="Vacancy Card">
                    <div class="row mb-3">
                        <label for="position_title_${cardIndex}" class="col-sm-3 col-form-label">Position Title:</label>
                        <div class="col-sm-9">
                            <input type="text" id="position_title_${cardIndex}" class="form-control" name="position_title[]" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="number_of_vacancies_${cardIndex}" class="col-sm-3 col-form-label">Number of Vacancies:</label>
                        <div class="col-sm-9">
                            <input type="number" id="number_of_vacancies_${cardIndex}" class="form-control" name="number_of_vacancies[]" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="job_description_${cardIndex}" class="col-sm-3 col-form-label">Job Description:</label>
                        <div class="col-sm-9">
                            <textarea id="job_description_${cardIndex}" class="form-control" name="job_description[]" rows="4" required></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="place_of_assignment_${cardIndex}" class="col-sm-3 col-form-label">Place of Assignment:</label>
                        <div class="col-sm-9">
                            <input type="text" id="place_of_assignment_${cardIndex}" class="form-control" name="place_of_assignment[]" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="employment_status_${cardIndex}" class="col-sm-3 col-form-label">Employment Status:</label>
                        <div class="col-sm-9">
                            <select id="employment_status_${cardIndex}" class="form-select" name="employment_status[]" required>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contractual">Contractual</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="salary_range_${cardIndex}" class="col-sm-3 col-form-label">Salary:</label>
                        <div class="col-sm-9">
                            <input type="number" id="salary_range_${cardIndex}" class="form-control" name="salary_range[]" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="duration_of_employment_${cardIndex}" class="col-sm-3 col-form-label">Duration of Employment:</label>
                        <div class="col-sm-9">
                            <input type="text" id="duration_of_employment_${cardIndex}" class="form-control" name="duration_of_employment[]" required>
                        </div>
                    </div>

                    <div style="font-weight: 700; margin-top:20px">Qualification Requirements</div>
                    <hr class="hr"/>
                    <div class="row mb-3">
                        <label for="education_${cardIndex}" class="col-sm-3 col-form-label">Education:</label>
                        <div class="col-sm-9">
                            <select id="education_${cardIndex}" class="form-select education" name="education[0][]" multiple required aria-multiselectable="true">
                                @foreach ($educations as $education)
                                    <option value="{{ $education->name }}">{{ $education->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="work_experience_${cardIndex}" class="col-sm-3 col-form-label">Work Experience:</label>
                        <div class="col-sm-9">
                            <select id="work_experience_${cardIndex}" class="form-select workExperience" name="work_experience[0][]" multiple required aria-multiselectable="true">
                                @foreach ($positions as $position )
                                    <option value="{{$position->name}}">{{$position->name}}</option>
                                    
                                @endforeach
                                
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="work_experience_duration_${cardIndex}" class="col-sm-3 col-form-label">Work Experience (month/s):</label>
                        <div class="col-sm-9">
                            <input type="text" id="work_experience_duration_${cardIndex}" class="form-control" name="work_experience_duration[]" required>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="skills_required_${cardIndex}" class="col-sm-3 col-form-label">Skills Required:</label>
                        <div class="col-sm-9">
                            <select id="skills_required_${cardIndex}" class="form-select skillsRequired" name="skills_required[0][]" multiple required aria-multiselectable="true">
                                @foreach ($skills as $skill)
                                    <option value="{{ $skill->name }}">{{ $skill->name }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="preferred_sex_${cardIndex}" class="col-sm-3 col-form-label">Preferred Sex:</label>
                        <div class="col-sm-9">
                            <select id="preferred_sex_${cardIndex}" class="form-select" name="preferred_sex[]">
                                <option value="Any" selected>Any</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="age_requirement_${cardIndex}" class="col-sm-3 col-form-label">Age Requirement:</label>
                        <div class="col-sm-9">
                            <input type="text" id="age_requirement_${cardIndex}" class="form-control" name="age_requirement[]">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="language_dialect_${cardIndex}" class="col-sm-3 col-form-label">Language/Dialect:</label>
                        <div class="col-sm-9">
                            <select id="language_dialect_${cardIndex}" class="form-select languageDialect" name="language_dialect[0][]" multiple aria-multiselectable="true">
                                <option value="Tagalog">Tagalog</option>
                                <option value="English">English</option>
                                <option value="Cebuano">Cebuano</option>
                                <option value="Ilocano">Ilocano</option>
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="license_eligibility_${cardIndex}" class="col-sm-3 col-form-label">License/Eligibility:</label>
                        <div class="col-sm-9">
                            <input type="text" id="license_eligibility_${cardIndex}" class="form-control" name="license_eligibility[]">
                        </div>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-danger btn-sm" onclick="removeCard(this)">Remove</button>
                    </div>
                </div>
            </template>

            <button type="button" class="btn btn-primary mb-3" onclick="addCard()">Add Vacant Position</button>

            <div class="text-end">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>

    <script>
        let cardIndex = 0;
        
        function addCard() {
            const template = document.getElementById("templateCard");
            const clone = template.content.cloneNode(true);

            // Update index-based name attributes and IDs
            clone.querySelectorAll('[name], [id], [for]').forEach(el => {
                if (el.name) {
                    if (el.name.includes('education')) {
                        el.name = `education[${cardIndex}][]`;
                    } else if (el.name.includes('skills_required')) {
                        el.name = `skills_required[${cardIndex}][]`;
                    } else if (el.name.includes('language_dialect')) {
                        el.name = `language_dialect[${cardIndex}][]`;
                    } else if (el.name.includes('work_experience')) {
                        el.name = `work_experience[${cardIndex}][]`;
                    }
                }
                if (el.id) {
                    el.id = el.id.replace('${cardIndex}', cardIndex);
                }
                if (el.getAttribute('for')) {
                    el.setAttribute('for', el.getAttribute('for').replace('${cardIndex}', cardIndex));
                }
            });

            const container = document.getElementById("cardContainer");
            const wrapper = document.createElement('div');
            wrapper.appendChild(clone);
            container.appendChild(wrapper);

            // Initialize Choices.js with accessibility options
            wrapper.querySelectorAll('select').forEach(select => {
                if (!select.classList.contains('choices-initialized')) {
                    new Choices(select, {
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
                }
            });

            // Ensure focusability
            wrapper.querySelectorAll('.choices__input').forEach(input => {
                input.setAttribute('tabindex', '0');
                const label = input.closest('.row').querySelector('label').textContent;
                input.setAttribute('aria-label', `Select ${label}`);
            });

            cardIndex++;
        }

        function removeCard(btn) {
            btn.closest('.job-card').remove();
        }

        function handleSubmit(event) {
            event.preventDefault();

            const form = document.getElementById('nsrpForm');
            const formData = new FormData(form);

            const json = {
                establishment: formData.get('establishment'),
                business_address: formData.get('business_address'),
                industry_classification: formData.get('industry_classification'),
                business_type: formData.get('business_type'),
                contact_person: formData.get('contact_person'),
                designation: formData.get('designation'),
                contact_number: formData.get('contact_number'),
                email_address: formData.get('email_address'),
                vacant_positions: []
            };

            const cardCount = document.querySelectorAll('.job-card').length;

            for (let i = 0; i < cardCount; i++) {
                const job = {
                    positionTitle: formData.getAll('position_title[]')[i],
                    number_of_Vacancies: formData.getAll('number_of_vacancies[]')[i],
                    job_description: formData.getAll('job_description[]')[i],
                    placeOfAssignment: formData.getAll('place_of_assignment[]')[i],
                    employment_status: formData.getAll('employment_status[]')[i],
                    salary: formData.getAll('salary_range[]')[i],
                    duration_of_employment: formData.getAll('duration_of_employment[]')[i],
                    education: formData.getAll(`education[${i}][]`),
                    work_experience: 
                            formData.getAll('work_experience_duration[]')[i]
                    ,
                    skills_required: formData.getAll(`skills_required[${i}][]`),
                    preferred_sex: formData.getAll('preferred_sex[]')[i],
                    age_requirement: formData.getAll('age_requirement[]')[i],
                    language_dialect: formData.getAll(`language_dialect[${i}][]`),
                    license_eligibility: formData.getAll('license_eligibility[]')[i]
                };

                json.vacant_positions.push(job);
            }

            console.log(JSON.stringify(json, null, 2));
            save(json);

        }

        // Attach event listeners
        document.addEventListener('DOMContentLoaded', () => {
            addCard();
            document.getElementById('nsrpForm').addEventListener('submit', handleSubmit);
        });

        function save(data){
            $('.loading').removeClass('d-none');
            $.ajax({
                url: '/nsrp1/save',
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Required for Laravel
                },
                data: data,
                success: function (response) {
                    console.log('Success:', response);
                    toastr.success('This is a successfully saved!');
                    window.location.href = '/nsrp1/success'
                },
                error: function (xhr) {
                    $('.loading').addClass('d-none');
                    console.error('Error:', xhr.responseText);
                    
                },
                complete: function () {
                    $('.loading').addClass('d-none');
                }
            });
        }
    </script>
</body>
</html>