import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Autocomplete,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { generateEndorsementPdf } from '../../pdf/endorsementpdf';

const ParticipantMatchDialog = ({ data, setDialog, selected }) => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Prepare autocomplete options: full_name (ID: id) to distinguish duplicates
  const applicants = data.applicants.map((applicant) => ({
    label: `${applicant.full_name} (ID: ${applicant.id})`,
    id: applicant.id,
  }));

  // Initialize selected applicant based on selected prop
  const init = () => {
    const temp = applicants.find((x) => x.id === selected);
    if (temp) {
      setSelectedApplicant(temp);
    }
  };

  useEffect(() => {
    init();
  }, [data.applicants, selected]);

  // Get applicant and matches for the selected applicant
  const selectedApplicantData = selectedApplicant
    ? data.applicants.find((applicant) => applicant.id === selectedApplicant.id)
    : null;
  const matches = selectedApplicantData ? selectedApplicantData.top_matches || [] : [];

  // Get employer data for comparison
  const getEmployerPosition = (employerId, positionTitle) => {
    const employer = data.employeers.find((emp) => emp.id === employerId);
    return employer?.vacant_positions.find((pos) => pos.positionTitle === positionTitle);
  };

  // DataGrid columns
  const columns = [
    { field: 'employer_name', headerName: 'Employer', flex: 1 },
    { field: 'position_title', headerName: 'Position', flex: 1 },
    { field: 'course_score', headerName: 'Course Score', width: 120, valueGetter: (value ) => `${value}%` },
    {
      field: 'work_experience_score',
      headerName: 'Work Exp. Score',
      width: 140,
      valueGetter: (value) => `${value}%`,
    },
    { field: 'skills_score', headerName: 'Skills Score', width: 120, valueGetter: (value ) => `${value}%` },
    { field: 'overall_score', headerName: 'Overall Score', width: 120, valueGetter: (value) => `${value}%` },
  ];
  const handleDownloadEndosrmentLetter = (_data) => {
    const employer_data = data.employeers.find(x=>x.id===_data.employer_id);
    const applicant = data.applicants.find(x=>x.id===selectedApplicant.id);
    console.log({employer_data,match:_data,selectedApplicant,applicant});
    
    generateEndorsementPdf({employer_data,match:_data,applicant});
  }
  return (
    <Dialog open={true} fullWidth maxWidth="lg" onClose={() => setDialog(false)}>
      <DialogTitle>
        <Typography variant="h6" color="initial">
          Applicant Position Matches
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ mt: 2 }}>
            <Autocomplete
            disabled
              options={applicants}
              value={selectedApplicant}
              fullWidth
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                setSelectedApplicant(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Applicant"
                  variant="outlined"
                  fullWidth
                />
              )}
              sx={{ mb: 2 }}
            />
          </Box>
          {selectedApplicant && (
            <>
              <Box sx={{ flex: 1, position: 'relative', height: 'calc(100vh - 350px)' }}>
                <Box sx={{ inset: 0, position: 'absolute' }}>
                  <DataGrid
                    rows={matches}
                    columns={columns}
                    getRowId={(row) => `${row.employer_id}-${row.position_title}`}
                    loading={false}
                    disableSelectionOnClick
                    sx={{ bgcolor: 'white' }}
                  />
                </Box>
              </Box>
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" color="initial" gutterBottom>
                    Score Computation Details
                  </Typography>
                  {matches.length > 0 ? (
                    matches.map((match, index) => {
                      const position = getEmployerPosition(match.employer_id, match.position_title);
                      const matchedSkills = selectedApplicantData?.core_skills.filter((skill) =>
                        position?.skills_required.includes(skill)
                      ) || [];
                      const unmatchedSkills = position?.skills_required.filter(
                        (skill) => !selectedApplicantData?.core_skills.includes(skill)
                      ) || [];
                      const matchingWorkExperience = selectedApplicantData?.work_experience.filter(
                        (exp) => exp.job_title.toLowerCase() === 'programmer' // Assumes backend logic
                      ) || [];
                      const totalDuration = matchingWorkExperience.reduce(
                        (sum, exp) => sum + parseInt(exp.duration),
                        0
                      );

                      return (
                        <Box key={index} sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" color="primary">
                            {match.employer_name} - {match.position_title}
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemText
                                primary="Course Score (30%)"
                                secondary={
                                  <>
                                    <Typography variant="body2">
                                      Applicant Education: {selectedApplicantData?.education}
                                    </Typography>
                                    <Typography variant="body2">
                                      Required: {position?.education.join(', ')}
                                    </Typography>
          
                                    <Typography variant="body2">
                                      {selectedApplicantData?.education &&
                                      position?.education.includes(selectedApplicantData.education)
                                        ? `Match: 100% (Education matches)`
                                        : `No Match: 0% (Education does not match)`}
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Work Experience Score (50%)"
                                secondary={
                                  <>
                                    <Typography variant="body2">
                                      {/* {JSON.stringify(matchingWorkExperience)} */}
                                      Applicant Work Experience:{' '}
                                      {/* {matchingWorkExperience.length > 0
                                        ? matchingWorkExperience
                                            .map((exp) => `${exp.job_title} (${exp.duration} months)`)
                                            .join(', ')
                                        : 'None'} */}
                                        {selectedApplicantData.work_experience.length > 0
                                        ? selectedApplicantData.work_experience
                                            .map((exp) => `${exp.job_title} (${exp.duration} months)`)
                                            .join(', ')
                                        : 'None'}
                                    </Typography>
                                    <Typography variant="body2">
                                      Required Work Experience: {position.work_experience.join(',')}
                                    </Typography>
                                    <Typography variant="body2">
                                      Required Work Experience Duration: {position.work_experience_duration} month(s)
                                    </Typography>
                                    <Typography variant="body2">
                                      Total Duration: {totalDuration} months
                                    </Typography>
                                    <Typography variant="body2">
                                      Score: {match.work_experience_score}%
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Skills Score (20%)"
                                secondary={
                                  <>
                                    <Typography variant="body2">Applicant Skills:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                      {selectedApplicantData?.core_skills.map((skill) => (
                                        <Chip
                                          key={skill}
                                          label={skill}
                                          color={
                                            matchedSkills.includes(skill) ? 'success' : 'default'
                                          }
                                          size="small"
                                        />
                                      ))}
                                    </Box>
                                    <Typography variant="body2">Required Skills:</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                      {position?.skills_required.map((skill) => (
                                        <Chip
                                          key={skill}
                                          label={skill}
                                          color={
                                            matchedSkills.includes(skill) ? 'success' : 'error'
                                          }
                                          size="small"
                                        />
                                      ))}
                                    </Box>
                                    <Typography variant="body2">
                                      Matched: {matchedSkills.length} of{' '}
                                      {position?.skills_required.length} skills
                                    </Typography>
                                    <Typography variant="body2">
                                      Score: {match.skills_score}% ({matchedSkills.length}/
                                      {position?.skills_required.length} matched)
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Overall Score"
                                secondary={`(0.3 × ${match.course_score}) + (0.5 × ${match.work_experience_score}) + (0.2 × ${match.skills_score}) = ${match.overall_score}%`}
                              />
                            </ListItem>
                            <ListItem>
                              <Button onClick={()=>handleDownloadEndosrmentLetter(match)}>
                                Download Endorsement Letter
                              </Button>
                            </ListItem>
                          </List>
                        </Box>
                      );
                    })
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No matches available for this applicant.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantMatchDialog;