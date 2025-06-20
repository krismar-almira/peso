import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useSnackbar } from 'notistack';
import { localizeTime } from '../../helpers/helper';

const Nsrp2Dialog = ({ setDialog, data }) => {
    const { enqueueSnackbar } = useSnackbar();
    const {
        id,
        full_name,
        sex,
        birth_day,
        marital_status,
        disability,
        mobile_number,
        email,
        present_address,
        permanent_address,
        employment_status,
        willing_to_work,
        education,
        school_graduated,
        year_graduated,
        work_experience,
        core_skills,
        preferred_occupation,
        preferred_work_location,
        willing_to_work_abroad,
        government_id,
        language_spoken,
        internet_access,
        created_at,
        updated_at,
        confirmed,
        j_s
    } = data;

    // Parse work_experience and language_spoken from JSON strings
    const parsedWorkExperience = work_experience ? JSON.parse(work_experience) : [];
    const parsedLanguageSpoken = language_spoken ? JSON.parse(language_spoken) : [];

    return (
        <Dialog open={true} fullWidth maxWidth='sm'>
            <DialogTitle>
                Job Seeker Profile
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography><strong>Full Name:</strong> {full_name}</Typography>
                        <Typography><strong>Sex:</strong> {sex}</Typography>
                        <Typography><strong>Birth Date:</strong> {new Date(birth_day).toLocaleDateString()}</Typography>
                        <Typography><strong>Marital Status:</strong> {marital_status}</Typography>
                        <Typography><strong>Disability:</strong> {disability || 'None'}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>Mobile Number:</strong> {mobile_number}</Typography>
                        <Typography><strong>Email:</strong> {email}</Typography>
                        <Typography><strong>Present Address:</strong> {present_address}</Typography>
                        <Typography><strong>Permanent Address:</strong> {permanent_address}</Typography>
                    </Grid>
                </Grid>

                <Box mt={2}>
                    <Typography variant="subtitle1"><strong>Employment Status:</strong> {employment_status}</Typography>
                    <Typography><strong>Willing to Work immediately:</strong> {willing_to_work}</Typography>
                    <Typography><strong>Preferred Occupation:</strong> {preferred_occupation}</Typography>
                    <Typography><strong>Preferred Work Location:</strong> {preferred_work_location}</Typography>
                    <Typography><strong>Willing to Work Abroad:</strong> {willing_to_work_abroad ? 'Yes' : 'No'}</Typography>
                    <Typography><strong>Internet Access:</strong> {internet_access ? 'Yes' : 'No'}</Typography>
                    <Typography><strong>Government ID:</strong> {government_id}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mb={3}>
                    <Typography variant="h6">Education</Typography>
                    <Typography><strong>Degree:</strong> {education}</Typography>
                    <Typography><strong>School Graduated:</strong> {school_graduated}</Typography>
                    <Typography><strong>Year Graduated:</strong> {year_graduated}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {parsedWorkExperience.length > 0 && (
                    <Box mb={3}>
                        <Typography variant="h6">Work Experience</Typography>
                        {parsedWorkExperience.map((exp, index) => (
                            <Box key={index} mb={2}>
                                <Typography><strong>Job Title:</strong> {exp.job_title}</Typography>
                                <Typography><strong>Company Name:</strong> {exp.company_name}</Typography>
                                <Typography><strong>Duration:</strong> {exp.duration} {exp.duration > 1 ? 'months' : 'month'}</Typography>
                                <Typography><strong>Reason for Leaving:</strong> {exp.reason_for_leaving}</Typography>
                                {index < parsedWorkExperience.length - 1 && <Divider sx={{ my: 1 }} />}
                            </Box>
                        ))}
                    </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Box mb={3}>
                    <Typography variant="h6">Skills and Languages</Typography>
                    <Typography sx={{ mt: 1 }}><strong>Core Skills:</strong></Typography>
                    <Chip label={core_skills} size="small" sx={{ mr: 1, mt: 0.5 }} />
                    <Typography sx={{ mt: 1 }}><strong>Languages Spoken:</strong></Typography>
                    {parsedLanguageSpoken.map((lang, i) => (
                        <Chip key={i} label={lang} size="small" sx={{ mr: 1, mt: 0.5 }} />
                    ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mt={2}>
                    <Typography variant="subtitle1"><strong>Confirmed:</strong> {confirmed ? 'Yes' : 'No'}</Typography>
                    <Typography><strong>Created At:</strong> {localizeTime(created_at)}</Typography>
                    <Typography><strong>Updated At:</strong> {localizeTime(updated_at)}</Typography>
                    <Typography><strong>Job Fair:</strong> {j_s.theme} ({j_s.venue}, {new Date(j_s.event_date).toLocaleDateString()})</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialog(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Nsrp2Dialog;