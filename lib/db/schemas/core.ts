import { relations } from "drizzle-orm";
import { pgTable, varchar, text, integer, decimal, serial, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const departments = pgTable("departments", {
    id: serial("id").primaryKey(),
    code: varchar("code", { length: 10 }).notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    headOfDepartment: integer("head_of_department"),
});

export const faculty = pgTable("faculty", {
    id: serial("id").primaryKey(),
    facultyId: varchar("faculty_id", { length: 20 }).notNull().unique(),
    departmentId: integer("department_id").notNull(),
    designation: varchar("designation", {
        enum: ["professor", "assistant_professor", "associate_professor", "lecturer"]
    }).notNull().default("assistant_professor"),
    status: varchar("status", { enum: ["active", "on_leave", "retired"] }).notNull().default("active"),
    office: varchar("office", { length: 50 }),
    phone: varchar("phone", { length: 20 })
});

export const students = pgTable("students", {
    id: serial("id").primaryKey(),
    studentId: varchar("student_id", { length: 20 }).notNull().unique(),
    seriesId: integer("series_id").notNull(),
    departmentId: integer("department_id").notNull(),
    currentSemester: integer("current_semester").notNull().default(1),
    major: varchar("major", { length: 100 }),
    gpa: decimal("gpa", { precision: 3, scale: 2 }),
    phone: varchar("phone", { length: 20 }),
});

export const academicSeries = pgTable("academic_series", {
    id: serial("id").primaryKey(),
    seriesName: varchar("series_name", { length: 20 }).notNull().unique(),
    startYear: integer("start_year").notNull(),
    currentSemester: integer("current_semester").notNull(),
    totalSemesters: integer("total_semesters").notNull().default(8),
    departmentId: integer("department_id"),
});

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    courseCode: varchar("course_code", { length: 20 }).notNull().unique(),
    courseName: varchar("course_name", { length: 200 }).notNull(),
    credits: integer("credits").notNull().default(3),
    departmentId: integer("department_id").notNull(),
    description: text("description"),
    semesterOffered: integer("semester_offered"),
    type: varchar("type", { enum: ["theory", "sessional", "other"] }),
    isElective: boolean("is_elective").default(false),
    maxSeats: integer("max_seats").default(60),
    //TODO: add syllabus , questions vector embedding id 
});

export const sections = pgTable("sections", {
    id: serial("id").primaryKey(),
    courseId: integer("course_id").notNull(),
    sectionCode: varchar("section_code", { length: 10 }).notNull(),
    semester: varchar("semester", { length: 20 }).notNull(),
    schedule: text("schedule"),
    room: varchar("room", { length: 50 }),
    maxStudents: integer("max_students").default(30),
    currentStudents: integer("current_students").default(0),
    // Store multiple faculty IDs as comma-separated or JSON TODO: handle it better
    facultyIds: text("faculty_ids"),
    primaryFacultyId: integer("primary_faculty_id").notNull(),
});

export const enrollments = pgTable("enrollments", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    sectionId: integer("section_id").notNull(),
    enrollmentDate: date("enrollment_date").notNull().defaultNow(),
    status: varchar("status", {
        enum: ["enrolled", "waitlisted", "dropped", "completed"]
    }).notNull().default("enrolled"),
    finalGrade: varchar("final_grade", { length: 5 }),
    gradePoints: decimal("grade_points", { precision: 3, scale: 2 }),
    attendancePercentage: decimal("attendance_percentage", { precision: 5, scale: 2 }),
});

export const assignments = pgTable("assignments", {
    id: serial("id").primaryKey(),
    sectionId: integer("section_id").notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    assignmentType: varchar("assignment_type", {
        enum: ["homework", "quiz", "exam", "project"]
    }).notNull(),
    dueDate: timestamp("due_date").notNull(),
    maxPoints: integer("max_points").notNull().default(100),
    description: text("description"),
});

export const grades = pgTable("grades", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").notNull(),
    assignmentId: integer("assignment_id").notNull(),
    pointsEarned: integer("points_earned"),
    grade: varchar("grade", { length: 5 }),
    feedback: text("feedback"),
    submissionDate: timestamp("submission_date"),
});

export const announcements = pgTable("announcements", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 200 }).notNull(),
    content: text("content").notNull(),
    authorId: text("author_id").notNull(),
    targetAudience: varchar("target_audience", {
        enum: ["all", "students", "faculty", "department", "course"]
    }).notNull(),
    targetId: integer("target_id"),
    publishDate: timestamp("publish_date").notNull().defaultNow(),
    isUrgent: boolean("is_urgent").default(false),
});

export const materials = pgTable("materials", {
    id: serial("id").primaryKey(),
    courseId: integer("course_id").notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    filePath: varchar("file_path", { length: 500 }),
    fileType: varchar("file_type", { length: 50 }),
    uploaderId: text("uploader_id").notNull(),
    uploadDate: timestamp("upload_date").notNull().defaultNow(),
    tags: text("tags"),
    //TODO: add vector embedding for semantic search
});


// <========== RELATIONS ==========>
export const departmentsRelations = relations(departments, ({ one, many }) => ({
    head: one(faculty, {
        fields: [departments.headOfDepartment],
        references: [faculty.id],
    }),
    faculty: many(faculty),
    students: many(students),
    courses: many(courses),
    academicSeries: many(academicSeries),
}));

export const facultyRelations = relations(faculty, ({ one, many }) => ({
    user: one(user, {
        fields: [faculty.id],
        references: [user.id],
    }),
    department: one(departments, {
        fields: [faculty.departmentId],
        references: [departments.id],
    }),
    sections: many(sections),
    grades: many(grades),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
    user: one(user, {
        fields: [students.id],
        references: [user.id],
    }),
    department: one(departments, {
        fields: [students.departmentId],
        references: [departments.id],
    }),
    series: one(academicSeries, {
        fields: [students.seriesId],
        references: [academicSeries.id],
    }),
    enrollments: many(enrollments),
    grades: many(grades),
}));

export const academicSeriesRelations = relations(academicSeries, ({ one, many }) => ({
    department: one(departments, {
        fields: [academicSeries.departmentId],
        references: [departments.id],
    }),
    students: many(students),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
    department: one(departments, {
        fields: [courses.departmentId],
        references: [departments.id],
    }),
    sections: many(sections),
    materials: many(materials),
}));

export const sectionsRelations = relations(sections, ({ one, many }) => ({
    course: one(courses, {
        fields: [sections.courseId],
        references: [courses.id],
    }),
    primaryFaculty: one(faculty, {
        fields: [sections.primaryFacultyId],
        references: [faculty.id],
    }),
    enrollments: many(enrollments),
    assignments: many(assignments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
    student: one(students, {
        fields: [enrollments.studentId],
        references: [students.id],
    }),
    section: one(sections, {
        fields: [enrollments.sectionId],
        references: [sections.id],
    }),
}));

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
    section: one(sections, {
        fields: [assignments.sectionId],
        references: [sections.id],
    }),
    grades: many(grades),
}));

export const gradesRelations = relations(grades, ({ one }) => ({
    student: one(students, {
        fields: [grades.studentId],
        references: [students.id],
    }),
    assignment: one(assignments, {
        fields: [grades.assignmentId],
        references: [assignments.id],
    }),
}));

export const announcementsRelations = relations(announcements, ({ one }) => ({
    author: one(user, {
        fields: [announcements.authorId],
        references: [user.id],
    }),
}));

export const materialsRelations = relations(materials, ({ one }) => ({
    course: one(courses, {
        fields: [materials.courseId],
        references: [courses.id],
    }),
    uploader: one(user, {
        fields: [materials.uploaderId],
        references: [user.id],
    }),
}));