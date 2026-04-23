-- DropForeignKey
ALTER TABLE "WorkoutAssignment" DROP CONSTRAINT "WorkoutAssignment_planId_fkey";

-- AddForeignKey
ALTER TABLE "WorkoutAssignment" ADD CONSTRAINT "WorkoutAssignment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
