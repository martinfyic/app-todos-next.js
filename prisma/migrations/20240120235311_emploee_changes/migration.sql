-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "isadmin" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "role" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "employee_pk" PRIMARY KEY ("id")
);
