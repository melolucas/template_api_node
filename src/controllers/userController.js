const userService = require("../services/userService");

exports.getAllUsers = async (req, res, next) => {
  try {
    const filters = req.query;
    const users = await userService.getAllUsers(filters);

    const usersResponse = users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return {
        ...userWithoutPassword,
        id: user.id.toString(),
        document: user.document.toString(),
      };
    });

    res.status(200).json(usersResponse);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    if (user.success === false) {
      return res.status(400).json({ success: false, message: user.message });
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  try {
      const token = req.user.token; 
      const result = await userService.updateUserByToken(token, req.body);

      if (result.success) {
          const { password, ...userWithoutPassword } = result.user;
          res.status(200).json({
              message: 'User updated successfully',
          });
      } else {
          res.status(404).json({
              success: false,
              message: result.message,
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);

      if (result.success) {
          res.status(200).json({
              message: 'Login successful',
              user: result.user,
          });
      } else {
          res.status(401).json({
              success: false,
              message: result.message,
          });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to login user' });
  }
};

