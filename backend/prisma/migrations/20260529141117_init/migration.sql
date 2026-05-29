-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "instructor" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Not Started',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
