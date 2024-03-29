const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/finances/:projectId", (req, res) => {
  try {
    const project_id = req.params.projectId;
    console.log(project_id);
    const {
      total_cost,
      funding_source,
    
      revenue_generated,
    } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No finance details provided",
      });
    }

    db.query(
      "INSERT INTO finance (project_id, total_cost, funding_source,revenue_generated) VALUES (?, ?, ?, ?,?)",
      [
        project_id,
        total_cost,
        funding_source,
        
        revenue_generated,
      ],
      (error, result) => {
        if (error) {
          return res.json({
            status: 401,
            success: false,
            message: error,
          });
        }
        return res.json({
          status: 201,
          success: true,
          message: "Finance record created successfully",
          finance: result[0],
        });
      }
    );
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error,
    });
  }
});

router.put("/finances/:id", (req, res) => {
  try {
    const financeId = req.params.id;
    const {
      total_cost,
      funding_source,
     
      revenue_generated,
    } = req.body;

    console.log(req.body);

    if (!req.body) {
      return res.json({
        status: 401,
        success: false,
        message: "No finace details provided to update",
      });
    }

    let updateFields = [];
    let updateValues = [];

    if (total_cost) {
      updateFields.push("total_cost = ?");
      updateValues.push(total_cost);
    }
    if (funding_source) {
      updateFields.push("funding_source = ?");
      updateValues.push(funding_source);
    }
   
    if (revenue_generated) {
      updateFields.push("revenue_generated = ?");
      updateValues.push(revenue_generated);
    }

    updateValues.push(financeId);

    const sql = `UPDATE finance SET ${updateFields.join(
      ", "
    )} WHERE finance_id = ?`;

    db.query(sql, updateValues, (error, result) => {
      if (error) {
        return res.json({
          status: 401,
          success: false,
          message: error,
        });
      }
      return res.json({
        status: 200,
        success: true,
        message: "finance updated successfully",
        project: result[0],
      });
    });
  } catch (error) {
    return res.json({
      status: 500,
      success: false,
      message: error,
    });
  }
});

router.get("/finances/all", (req, res) => {
  try {
    db.query(
      "SELECT p.project_name, f.total_cost, f.revenue_generated, p.project_id FROM finance f JOIN project p ON f.project_id = p.project_id LIMIT 10",
      (error, results) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Database error: " + error,
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No finance data found",
          });
        }

        console.log(results)
        const projectsWithROI = results.map((project) => {
          const total_cost = project.total_cost;
          const revenue_generated = project.revenue_generated;
          const roi = ((revenue_generated - total_cost) / total_cost) * 100;

          // Update ROI in the database
          db.query(
            "UPDATE finance SET roi = ? where project_id=?",
            [roi,project.project_id],
            (updateError, updateResults) => {
              if (updateError) {
                console.error("Failed to update ROI:", updateError);
              }
            }
          );

          return {
            project_name: project.project_name,
            roi: roi,
          };
        });

        return res.status(200).json({
          success: true,
          projectsWithROI: projectsWithROI,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error,
    });
  }
});

router.get("/finances/:id", (req, res) => {
  try {
    const project_id = req.params.id;

    if (!project_id) {
      return res.status(400).json({
        success: false,
        message: "No project_id provided",
      });
    }

    db.query(
      "SELECT total_cost, revenue_generated FROM finance WHERE project_id = ?",
      [project_id],
      (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Database error: " + error,
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "No finance data found for the provided project_id",
          });
        }

        // Calculate ROI
        const total_cost = result[0].total_cost;
        const revenue_generated = result[0].revenue_generated;
        const roi = ((revenue_generated - total_cost) / total_cost) * 100;

        // Nested query to fetch project name
        db.query(
          "SELECT project_name FROM project WHERE project_id = ?",
          [project_id],
          (error, results) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: "Database error: " + error,
              });
            }

            if (results.length === 0) {
              return res.status(404).json({
                success: false,
                message: "No project found for the provided project_id",
              });
            }

            // Return response with ROI and project name
            return res.status(200).json({
              success: true,
              roi: roi,
              projectName: results[0].project_name,
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error,
    });
  }
});

module.exports = router;
