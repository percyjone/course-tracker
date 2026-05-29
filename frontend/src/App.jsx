import { useState, useEffect } from "react";
import API from "./api";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function App() {
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    courseName: "",
    instructor: "",
    category: "",
    duration: "",
  });

  const getCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addCourse = async () => {
    if (
      !form.courseName ||
      !form.instructor ||
      !form.category ||
      !form.duration
    ) {
      alert("Please fill all fields");
      return;
    }

    await API.post("/courses", form);

    setForm({
      courseName: "",
      instructor: "",
      category: "",
      duration: "",
    });

    getCourses();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
        p: 4,
      }}
    >
      <Container maxWidth={false}>
        {/* Header */}

        <Box
          sx={{
            background:
              "linear-gradient(135deg,#2563eb,#06b6d4)",
            color: "white",
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            Course Tracker
          </Typography>

          <Typography variant="h6">
            Manage Your Learning Journey
          </Typography>
        </Box>

        {/* Stats */}

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "#1e293b",
                color: "white",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Total Courses
                </Typography>

                <Typography
                  variant="h3"
                  color="#38bdf8"
                >
                  {courses.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "#1e293b",
                color: "white",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Categories
                </Typography>

                <Typography
                  variant="h3"
                  color="#22c55e"
                >
                  {
                    new Set(
                      courses.map((c) => c.category)
                    ).size
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                background: "#1e293b",
                color: "white",
              }}
            >
              <CardContent>
                <Typography variant="h6">
                  Instructors
                </Typography>

                <Typography
                  variant="h3"
                  color="#e879f9"
                >
                  {
                    new Set(
                      courses.map(
                        (c) => c.instructor
                      )
                    ).size
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Form */}

        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            mb={3}
          >
            Add New Course
          </Typography>

          <TextField
            fullWidth
            label="Course Name"
            name="courseName"
            margin="normal"
            value={form.courseName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Instructor"
            name="instructor"
            margin="normal"
            value={form.instructor}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Category"
            name="category"
            margin="normal"
            value={form.category}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Duration"
            name="duration"
            margin="normal"
            value={form.duration}
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
            }}
            onClick={addCourse}
          >
            Add Course
          </Button>
        </Paper>

        {/* Table */}

        <Paper
          sx={{
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead
              sx={{
                background: "#2563eb",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Course
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Instructor
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Category
                </TableCell>

                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Duration
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    {course.courseName}
                  </TableCell>

                  <TableCell>
                    {course.instructor}
                  </TableCell>

                  <TableCell>
                    {course.category}
                  </TableCell>

                  <TableCell>
                    {course.duration}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;