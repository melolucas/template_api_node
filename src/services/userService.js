const prisma = require("../config/database");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.createUser = async (data) => {
  const token = crypto.randomBytes(32).toString("hex");
  data.created_at = new Date();

  try {
    data.document = data.document.toString();
    data.password = await bcrypt.hash(data.password, 10);
    const user = await prisma.users.create({
      data: {
        ...data,
        token,
      },
    });

    return { success: true, user };
  } catch (error) {
    if (error.code === "P2002") {
      const uniqueField = error.meta.target;
      let message = "Duplicate value error";

      if (uniqueField.includes("email")) {
        message = "Email already exists";
      } else if (uniqueField.includes("document")) {
        message = "Document already exists";
      } else if (uniqueField.includes("token")) {
        message = "Token already exists";
      }

      return { success: false, message };
    }

    throw error;
  }
};

exports.getAllUsers = async (filters) => {
  try {
    const users = await prisma.users.findMany({
      where: filters,
    });
    return users;
  } catch (error) {
    throw error;
  }
};

exports.updateUserByToken = async (token, data) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    data.password = await bcrypt.hash(data.password, 10);
    const updatedUser = await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        ...data,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    if (error.code === "P2025") {
      return { success: false, message: "User not found or no update made" };
    }
    throw error;
  }
};

exports.loginUser = async (email, password) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { success: false, message: "Invalid email or password" };
    }

    user.id = user.id.toString();
    const { password: pwd, ...userWithoutPassword } = user;

    return { success: true, user: userWithoutPassword };
  } catch (error) {
    throw error;
  }
};
