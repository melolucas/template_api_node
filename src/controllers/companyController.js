const companyService = require("../services/companyService.js");

exports.getAllCompanies = async (req, res, next) => {
  try {
    const filters = req.query;
    const users = await companyService.getAllCompanies(filters);

    const usersResponse = users.map((company) => {

      return {
        id: company.id.toString(),
        document: company.document.toString(),
      };
    });

    res.status(200).json(usersResponse);
  } catch (error) {
    next(error);
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
     
    if (company.success === false) {
      return res.status(400).json({ success: false, message: company.message });
    }

    res.status(201).json({
      success: true,
      message: "Company created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create company" });
  }
};

exports.updatedCompany = async (req, res) => {
  try {
      const id = req.company.id; 
      const result = await companyService.updateCompanyById(id, req.body);

      if (result.success) {
          res.status(200).json({
              message: 'Company updated successfully',
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


