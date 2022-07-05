const getAllJobs = async (req, res) => {
    res.send('get all jobs');
};

const getJob = async (req, res) => {
    res.send('get job');
};

const createJob = async (req, res) => {
    res.send('job created');
};

const updateJob = async (req, res) => {
    res.send('job updated');
};

const deleteJob = async (req, res) => {
    res.send('job deleted');
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};