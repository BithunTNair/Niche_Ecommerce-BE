const USERS = require('../models/userModel');

const approveArtisan = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await USERS.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'user is not found' });
        }
        user.artisanProfile.isApproved = true,
            user.artisanProfile.status = 'approved'
        user.role = 'artisan'
        await user.save();
        return res.status(200).json({ message: 'Artisan approved successfully', user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'something went wrong' })
    }
};
module.exports = { approveArtisan }