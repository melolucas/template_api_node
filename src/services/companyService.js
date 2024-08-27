const prisma = require("../config/database");
const crypto = require("crypto");

exports.createCompany = async (data) => {
  const token = crypto.randomBytes(32).toString("hex");
  data.created_at = new Date();

  try {
    data.document = data.document.toString();
    const company = await prisma.companies.create({
      data: {
        ...data,
        token,
      },
    });

    return { success: true, company };
  } catch (error) {
    if (error.code === "P2002") {
      const uniqueField = error.meta.target;
      let message = "Duplicate value error";

      if (uniqueField.includes("document")) {
        message = "Document already exists";
      } else if (uniqueField.includes("token")) {
        message = "Token already exists";
      }

      return { success: false, message };
    }

    throw error;
  }
};

exports.getAllCompanies = async (filters) => {
  try {
    const companies = await prisma.companies.findMany({
      where: filters,
    });
    return companies;
  } catch (error) {
    throw error;
  }
};

exports.updateCompanyById = async (id, data) => {
  try {
    const company = await prisma.companies.findFirst({
      where: {
        id: id,
      },
    });

    if (!company) {
      return { success: false, message: "Company not found" };
    }

    data.updated_at = new Date();
    const updatedCompany = await prisma.companies.update({
      where: {
        id: company.id,
      },
      data: {
        ...data,
      },
    });

    return { success: true, user: updatedCompany };
  } catch (error) {
    if (error.code === "P2025") {
      return { success: false, message: "Company not found or no update made" };
    }
    throw error;
  }
};
