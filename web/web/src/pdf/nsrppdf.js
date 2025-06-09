import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts"; // No need to assign
// import JsBarcode from "jsbarcode";

// const formatBarcodeText = (text) => {
//   return text.replace(/(\d{4})/g, "$1 ").trim();
// };
export const generateNsrpPdf = (data) => {
  // Reusable layout for tables with only an outside border
    const docDefinition = 
    {
        defaultStyle: {
            fontSize: 9 
        },
        "content": [
            {
                "text": "Republic of the Philippines\nDepartment of Labor and Employment\nPESO EMPLOYMENT INFORMATION SYSTEM\nREGISTRATION FORM",
                "alignment": "center",
                "style": "header"
            },
            {
                "text": "NSRP FORM 1\nJanuary 2017",
                "alignment": "center"
            },
            {
                "text": "1x1 Photo",
                "alignment": "center",
                "margin": [0, 0, 0, 10]
            },
            {
                "text": "INSTRUCTIONS: Please fill out the form legibly with ballpen. Print in block letters. Check appropriate boxes. Please do not leave any items unanswered. Indicate \"NA\" if not applicable. You may use extra sheet if needed. Submit accomplished form to the Public Employment Service Office Manager or Officer in your City / Municipality.",
                "margin": [0, 10, 0, 10]
            },
            {
                "text": "I. PERSONAL INFORMATION",
                "bold": true,
                "margin": [0, 10, 0, 5]
            },
            {
            "table": {
                "widths": [70, '*', 100, 50],
                "body": [
                [
                    { "text": "SURNAME", "bold": true},
                    { "text": "FIRST NAME", "bold": true },
                    { "text": "MIDDLE NAME", "bold": true },
                    { "text": "SUFFIX (Ex: Sr., Jr., II, etc.)", "bold": true }
                ],
                [
                    { "text": data?.first_name, style:'inputData'},
                    { "text": data?.middle_name, style:'inputData' },
                    { "text": data?.surname, style:'inputData'},
                    { "text": data?.suffix, style:'inputData' }
                ],
                [
                    { "text": "DATE OF BIRTH (mm/dd/yyyy)", "bold": true },
                    { "text": data?.birthday, style:'inputData' },
                    { "text": "PLACE OF BIRTH", "bold": true },
                    { "text": data?.birth_place, style:'inputData'  },
                ],
                [
                    { "text": "SEX", "bold": true },
                    {text:data?.sex, style:'inputData'},
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "RELIGION", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "CIVIL STATUS", "bold": true },
                    {
                    "table": {
                        "widths": ["*", "*", "*", "*"],
                        "body": [
                        ["Single", "Separated", "Live-in", "Widowed"]
                        ]
                    }
                    },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "TIN", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "GSIS / SSS ID NO.", "bold": true },
                    { "text": "" },
                    { "text": "HEIGHT", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "PAG - IBIG NO.", "bold": true },
                    { "text": "" },
                    { "text": "WEIGHT", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "PHILHEALTH NO.", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "DISABILITY", "bold": true },
                    {
                    "table": {
                        "widths": ["*", "*", "*", "*"],
                        "body": [
                        ["Visual", "Speech", "Hearing", "Physical"]
                        ]
                    }
                    },
                    { "text": "Others, specify:", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "PRESENT ADDRESS", "bold": true },
                    {
                    "table": {
                        "widths": ["*", "*"],
                        "body": [
                        ["House No. / Street", "Village"],
                        ["Barangay", "Municipality / City"],
                        ["Province", ""]
                        ]
                    }
                    },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "EMAIL ADDRESS", "bold": true },
                    { "text": "" },
                    { "text": "LANDLINE NUMBER", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "CELLPHONE NUMBER", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "EMPLOYMENT STATUS / TYPE",
            "bold": true
            },
            // {
            // "table": {
            //     "widths": ["*", "*", "*", "*"],
            //     "body": [
            //     [
            //         {
            //         "table": {
            //             "widths": ["*", "*"],
            //             "body": [
            //             ["Employed", "Unemployed"],
            //             ["Wage", "New Entrant / Fresh Graduate"],
            //             ["Self Employed", "Finished Contract"],
            //             ["", "Terminated / Laidoff (local)"]
            //             ]
            //         }
            //         },
            //         {
            //         "table": {
            //             "widths": ["*"],
            //             "body": [
            //             ["Terminated / Laidoff (abroad)"],
            //             ["Specify country"],
            //             ["Others, specify"]
            //             ]
            //         }
            //         },
            //         { "text": "" },
            //         { "text": "" }
            //     ],
            //     [
            //         {
            //         "table": {
            //             "widths": ["*", "*"],
            //             "body": [
            //             ["Employed", "Resigned"],
            //             ["", "Retired"]
            //             ]
            //         }
            //         },
            //         { "text": "" },
            //         { "text": "" },
            //         { "text": "" }
            //     ],
            //     [
            //         { "text": "Are you actively looking for work", "bold": true },
            //         {
            //         "table": {
            //             "widths": ["*", "*"],
            //             "body": [
            //             ["Yes", "No"]
            //             ]
            //         }
            //         },
            //         { "text": "How long have you been looking for work?", "bold": true },
            //         { "text": "" }
            //     ],
            //     [
            //         { "text": "Willing to work immediately?", "bold": true },
            //         {
            //         "table": {
            //             "widths": ["*", "*"],
            //             "body": [
            //             ["Yes", "No"]
            //             ]
            //         }
            //         },
            //         { "text": "If no, when?", "bold": true },
            //         { "text": "" }
            //     ],
            //     [
            //         { "text": "Are you a 4Ps beneficiary?", "bold": true },
            //         {
            //         "table": {
            //             "widths": ["*", "*"],
            //             "body": [
            //             ["Yes", "No"]
            //             ]
            //         }
            //         },
            //         { "text": "If yes, Household ID No.", "bold": true },
            //         { "text": "" }
            //     ]
            //     ]
            // },
            // "margin": [0, 5, 0, 10]
            // },
            {
            "text": "II. JOB PREFERENCE",
            "bold": true
            },
            {
            "table": {
                "widths": ["*", "*"],
                "body": [
                [
                    { "text": "PREFERRED OCCUPATION", "bold": true },
                    { "text": "PREFERRED WORK LOCATION", "bold": true }
                ],
                [
                    {
                    "table": {
                        "widths": ["*"],
                        "body": [
                        ["1. __________"],
                        ["2. __________"],
                        ["3. __________"],
                        ["4. __________"]
                        ]
                    }
                    },
                    {
                    "table": {
                        "widths": ["*", "*"],
                        "body": [
                        ["Local, specify cities / municipalities:", "1. __________"],
                        ["", "2. __________"],
                        ["", "3. __________"],
                        ["Overseas, specify countries:", "1. __________"],
                        ["", "2. __________"],
                        ["", "3. __________"]
                        ]
                    }
                    }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "table": {
                "widths": ["*", "*"],
                "body": [
                [
                    { "text": "EXPECTED SALARY (Range)", "bold": true },
                    { "text": "Passport No.", "bold": true }
                ],
                [
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "LANGUAGE / DIALECT PROFICIENCY", "bold": true },
                    { "text": "Expiry date", "bold": true }
                ],
                [
                    {
                    "table": {
                        "widths": ["*", "*", "*", "*"],
                        "body": [
                        ["", "READ", "WRITE", "SPEAK"],
                        ["English", "", "", ""],
                        ["Filipino", "", "", ""],
                        ["Others:", "", "", ""]
                        ]
                    }
                    },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "IV. EDUCATIONAL BACKGROUND",
            "bold": true
            },
            {
            "table": {
                "widths": ["*", "*", "*", "*", "*"],
                "body": [
                [
                    { "text": "SCHOOL", "bold": true },
                    { "text": "COURSE", "bold": true },
                    { "text": "Year Graduated", "bold": true },
                    { "text": "If not graduate, What level?", "bold": true },
                    { "text": "Year last attended", "bold": true }
                ],
                [
                    { "text": "Elementary", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "Secondary", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "Tertiary", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "V. TECHNICAL / VOCATIONAL AND OTHER TRAINING (included courses taken as part of college education)",
            "bold": true
            },
            {
            "table": {
                "widths": ["*", "*", "*"],
                "body": [
                [
                    { "text": "TRAINING / VOCATIONAL COURSE", "bold": true },
                    { "text": "DURATION (mm/dd/yyyy to mm/dd/yyyy)", "bold": true },
                    { "text": "Training Institution", "bold": true }
                ],
                [
                    { "text": "1.", "bold": true },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "2.", "bold": true },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "3.", "bold": true },
                    { "text": "" },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "VI. ELIGIBILITY / PROFESSIONAL LICENSE",
            "bold": true
            },
            {
            "table": {
                "widths": ["*", "*", "*", "*"],
                "body": [
                [
                    { "text": "ELIGIBILITY (Civil Service)", "bold": true },
                    { "text": "Rating", "bold": true },
                    { "text": "Date of examination", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "1.", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "2.", "bold": true },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "PROFESSIONAL LICENSE (PRC)", "bold": true },
                    { "text": "", "colSpan": 2 },
                    { "text": "" },
                    { "text": "Valid Until", "bold": true }
                ],
                [{ "text": "", "colSpan": 2 }, { "text": "" }, { "text": "" }, { "text": "" }]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "VII. WORK EXPERIENCE (Limit to 10 year period, start with the most recent employment)",
            "bold": true
            },
            {
            "table": {
                "widths": ["*", "*", "*", "*", "*"],
                "body": [
                [
                    { "text": "Company Name", "bold": true },
                    { "text": "Address (City/Municipality)", "bold": true },
                    { "text": "Position", "bold": true },
                    { "text": "Inclusive Dates (mm/yyyy to mm/yyyy)", "bold": true },
                    { "text": "Status (Permanent, Contractual Part-time, Probationary)", "bold": true }
                ],
                [
                    { "text": "" },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "VIII. OTHER SKILLS ACQUIRED WITHOUT FORMAL TRAINING",
            "bold": true
            },
            {
            "table": {
                "widths": ["*", "*", "*", "*"],
                "body": [
                [
                    { "text": "AUTO MECHANIC", "bold": true },
                    { "text": "ELECTRICAL EMBROIDERY", "bold": true },
                    { "text": "PHOTOGRAPHY", "bold": true },
                    { "text": "PLUMBING", "bold": true }
                ],
                [
                    { "text": "BEAUTICIAN", "bold": true },
                    { "text": "GARDENING", "bold": true },
                    { "text": "SEWING DRESSES", "bold": true },
                    { "text": "TAILORING", "bold": true }
                ],
                [
                    { "text": "CARPENTRY WORK", "bold": true },
                    { "text": "MASONRY", "bold": true },
                    { "text": "STENOGRAPHY", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "COMPUTER LITERATE", "bold": true },
                    { "text": "PAINTER/ARTIST", "bold": true },
                    { "text": "", "colSpan": 2 },
                    { "text": "" }
                ],
                [
                    { "text": "DOMESTIC CHORES", "bold": true },
                    { "text": "PAINTING JOBS", "bold": true },
                    { "text": "Others:", "bold": true },
                    { "text": "" }
                ],
                [
                    { "text": "DRIVER", "bold": true },
                    { "text": "CERTIFICATION / AUTHORIZATION", "bold": true },
                    { "text": "", "colSpan": 2 },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "This is to certify that all data / information that I have provided in this form are true to the best of my knowledge. This is also to authorize the DOLE to include my profile in the PESO Employment Information System; which is a subsystem of the PhilJobNet. It is understood that my name shall be made available to employers who have access to the Registry. I am also aware that DOLE is not obliged to seek employment on my behalf.",
            "margin": [0, 10, 0, 5]
            },
            {
            "table": {
                "widths": ["*", "*"],
                "body": [
                [
                    { "text": "Signature of Applicant", "bold": true },
                    { "text": "Date", "bold": true }
                ],
                [
                    { "text": "" },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            },
            {
            "text": "FOR USE OF PESO ONLY. PLEASE DO NOT WRITE BELOW THIS DOTTED LINE.",
            "bold": true,
            "margin": [0, 10, 0, 5]
            },
            {
            "table": {
                "widths": ["*", "*"],
                "body": [
                [
                    { "text": "Eligible for public employment services?", "bold": true },
                    { "text": "Assessed by:", "bold": true }
                ],
                [
                    {
                    "table": {
                        "widths": ["*"],
                        "body": [
                        ["YES"],
                        ["NO"]
                        ]
                    }
                    },
                    { "text": "" }
                ],
                [
                    { "text": "Types", "bold": true },
                    { "text": "" }
                ],
                [
                    {
                    "table": {
                        "widths": ["*"],
                        "body": [
                        ["Job Fair"],
                        ["JobStart"],
                        ["Others, specify:"]
                        ]
                    }
                    },
                    { "text": "Signature over Printed Name of Assessor", "bold": true }
                ],
                [
                    { "text": "" },
                    { "text": "" }
                ],
                [
                    { "text": "Date", "bold": true },
                    { "text": "" }
                ]
                ]
            },
            "margin": [0, 5, 0, 10]
            }
        ],
        "styles": {
            "header": {
            "fontSize": 12,
            "bold": true
            },
            "inputData":{
                "fontSize":12,
                "italics":true,
                "bold":true
            }
        }
    }

  pdfMake.createPdf(docDefinition).open();
};
